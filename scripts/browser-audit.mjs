/** Local built-site audit using installed Edge and native CDP mouse input.
 * Run with Node 20's --experimental-websocket. No installs or form submissions.
 * Screenshots/report go to an OS temp directory, never to public assets.
 */
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const base = 'http://127.0.0.1:4178'
const output = mkdtempSync(join(tmpdir(), 'feus-web-pointer-audit-'))
const edge = process.env.FEUS_AUDIT_BROWSER || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = spawn(edge, [
  '--headless=new', '--remote-debugging-port=0', '--no-first-run',
  '--no-default-browser-check', '--disable-background-networking',
  `--user-data-dir=${join(output, 'profile')}`, 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] })
let socket
let sequence = 0
let sessionId
const pending = new Map()
const listeners = new Map()
const report = { output, mode: 'Installed Edge headless; native CDP mouse input, not DOM dispatch', pages: [], clicks: [], blockedNonGet: [], localHttpErrors: [] }
const assetUrls = new Set()
const on = (event, callback) => {
  const callbacks = listeners.get(event) || []
  callbacks.push(callback)
  listeners.set(event, callbacks)
}
const send = (method, params = {}, session = sessionId) => new Promise((resolve, reject) => {
  const id = ++sequence
  const timer = setTimeout(() => { pending.delete(id); reject(Error(`CDP timeout: ${method}`)) }, 15000)
  pending.set(id, { resolve, reject, timer })
  socket.send(JSON.stringify({ id, method, params, ...(session ? { sessionId: session } : {}) }))
})
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails))
  return result.result.value
}
const settled = () => evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))')
const waitFor = (condition) => evaluate(`new Promise((resolve, reject) => {
  const check = () => { if (${condition}) { observer.disconnect(); clearTimeout(timer); resolve(true); } };
  const observer = new MutationObserver(check);
  const timer = setTimeout(() => { observer.disconnect(); reject(Error('DOM condition timed out')); }, 10000);
  observer.observe(document, {childList:true,subtree:true,attributes:true}); check();
})`)
const navigate = async (route) => {
  await send('Page.navigate', { url: base + route })
  await waitFor(`location.pathname + location.search + location.hash === ${JSON.stringify(route)} && !!document.querySelector('h1')`)
  await settled()
}
const capture = async (name) => {
  const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  writeFileSync(join(output, `${name}.png`), Buffer.from(data, 'base64'))
}
const pointer = async (selector) => {
  const point = await evaluate(`(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!element) throw Error('Missing pointer target');
    element.scrollIntoView({block:'center',behavior:'instant'});
    const r = element.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2};
  })()`)
  await settled()
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point })
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point })
  await settled()
}

try {
  const endpoint = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Edge startup timed out')), 15000)
    let stderr = ''
    browser.on('error', error => { clearTimeout(timer); reject(error) })
    browser.on('exit', code => { clearTimeout(timer); reject(Error(`Edge exited: ${code}`)) })
    browser.stderr.on('data', chunk => {
      stderr += chunk
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/)
      if (match) { clearTimeout(timer); resolve(match[1]) }
    })
  })
  socket = new WebSocket(endpoint)
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data)
    if (message.id) {
      const request = pending.get(message.id)
      if (!request) return
      clearTimeout(request.timer); pending.delete(message.id)
      if (message.error) request.reject(Error(JSON.stringify(message.error)))
      else request.resolve(message.result)
    } else {
      for (const callback of listeners.get(message.method) || []) callback(message.params)
    }
  }
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' }, null)
  ;({ sessionId } = await send('Target.attachToTarget', { targetId, flatten: true }, null))
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Network.enable')
  await send('Fetch.enable', { patterns: [{ urlPattern: '*' }] })
  on('Fetch.requestPaused', ({ requestId, request }) => {
    const local = new URL(request.url).origin === base
    if (request.method !== 'GET') report.blockedNonGet.push({ url: request.url, method: request.method })
    // No outbound forms, model calls, auth flows, analytics or external fonts.
    send(local && request.method === 'GET' ? 'Fetch.continueRequest' : 'Fetch.failRequest',
      local && request.method === 'GET' ? { requestId } : { requestId, errorReason: 'BlockedByClient' }).catch(console.error)
  })
  on('Network.responseReceived', ({ response, type }) => {
    if (!response.url.startsWith(base)) return
    if (response.status >= 400) report.localHttpErrors.push({ url: response.url, status: response.status })
    if (['Image', 'Stylesheet', 'Script', 'Font'].includes(type)) assetUrls.add(response.url)
  })
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `
    globalThis.auditClicks = [];
    document.addEventListener('click', event => globalThis.auditClicks.push({
      trusted: event.isTrusted, pointerType: event.pointerType,
      href: event.target.closest('a')?.getAttribute('href'),
      summary: event.target.closest('summary')?.textContent
    }), true);
  ` })
  const routes = ['/', '/feus-ai', '/cloud-runtime', '/get-started', '/demo', '/contact', '/trust', '/trust/security', '/security', '/architecture', '/status', '/faq']
  for (const width of [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: width === 390 ? 844 : 1000, deviceScaleFactor: 1, mobile: false })
    for (const route of routes) {
      await navigate(route)
      const measurements = await evaluate(`(() => {
        const root = document.documentElement;
        return {width:innerWidth,documentWidth:root.scrollWidth,visibility:document.visibilityState,
          h1:document.querySelector('h1')?.textContent,
          brokenImages:[...document.images].filter(i=>i.complete && i.naturalWidth===0).map(i=>i.currentSrc || i.src)};
      })()`)
      assert.equal(measurements.width, width)
      assert.ok(measurements.documentWidth <= width, `${route} overflow at ${width}: ${measurements.documentWidth}`)
      assert.deepEqual(measurements.brokenImages, [], `${route} broken images`)
      report.pages.push({ route, ...measurements })
      await capture(`${width}-${route.replaceAll('/', '_') || 'home'}`)
    }
    for (const [route, intent, label] of [
      ['/demo', 'demo', 'Request a Guided Live FEUS.ai Demonstration'],
      ['/get-started', 'adoption', 'FEUS.ai Adoption & Onboarding'],
      ['/security', 'security', 'Governance & Security'],
      ['/demo', 'offline-demo', 'Request an Offline Fixture Demonstration'],
    ]) {
      await navigate(route)
      const href = `/contact?type=${intent}#contact-form`
      await pointer(`a[href="${href}"]`)
      await waitFor(`document.querySelector('#inquiryType')?.value === ${JSON.stringify(label)}`)
      const result = await evaluate(`(() => {
        const field = document.querySelector('#inquiryType'); const rect = field.getBoundingClientRect();
        return {url:location.pathname+location.search+location.hash,selection:field.value,focus:document.activeElement.id,
          fieldTop:rect.top,fieldBottom:rect.bottom,height:innerHeight,clicks:globalThis.auditClicks};
      })()`)
      assert.equal(result.url, href)
      assert.equal(result.focus, 'inquiryType')
      assert.ok(result.fieldTop >= 85 && result.fieldBottom <= result.height, `Focused field offscreen: ${JSON.stringify(result)}`)
      assert.ok(result.clicks.some(click => click.trusted && click.pointerType === 'mouse' && click.href === href))
      report.clicks.push({ width, intent, ...result })
      await capture(`${width}-contact-${intent}`)
    }
    for (const [route, id] of [['/trust', 'historical-assessment'], ['/architecture', 'historical-architecture']]) {
      await navigate(route)
      await pointer(`#${id} > summary`)
      assert.ok(await evaluate(`document.querySelector('#${id}').open`))
      assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `${route} expanded overflow at ${width}`)
      const clicks = await evaluate('globalThis.auditClicks')
      assert.ok(clicks.some(click => click.trusted && click.pointerType === 'mouse' && click.summary))
      report.clicks.push({ width, disclosure: id, clicks })
      await capture(`${width}-${id}-expanded`)
    }
    await navigate('/contact?type=security#contact-form')
    await pointer('a[href="/contact?type=demo#contact-form"]')
    await waitFor("document.querySelector('#inquiryType')?.value === 'Request a Guided Live FEUS.ai Demonstration'")
    const sameRoute = await evaluate(`({selection:document.querySelector('#inquiryType').value,focus:document.activeElement.id,clicks:globalThis.auditClicks})`)
    assert.equal(sameRoute.focus, 'inquiryType')
    assert.ok(sameRoute.clicks.some(click => click.trusted && click.href === '/contact?type=demo#contact-form'))
    report.clicks.push({ width, sameRoute: true, ...sameRoute })
    await navigate('/faq')
    await pointer('main button[aria-controls]')
    assert.ok(await evaluate(`document.querySelector('main button[aria-controls]').getAttribute('aria-expanded') === 'true'`))
    const faqClicks = await evaluate('globalThis.auditClicks')
    assert.ok(faqClicks.some(click => click.trusted && click.pointerType === 'mouse'))
    report.clicks.push({ width, faqExpanded: true, clicks: faqClicks })
    await capture(`${width}-faq-expanded`)
    if (width === 390) {
      await navigate('/demo')
      await pointer('button[aria-controls="mobile-navigation"]')
      assert.ok(await evaluate(`document.querySelector('button[aria-controls="mobile-navigation"]').getAttribute('aria-expanded') === 'true'`))
      const menuClicks = await evaluate('globalThis.auditClicks')
      assert.ok(menuClicks.some(click => click.trusted && click.pointerType === 'mouse'))
      report.clicks.push({ width, mobileMenu: true, clicks: menuClicks })
      await capture('390-mobile-menu')
    }
  }
  report.assetCount = assetUrls.size
  assert.deepEqual(report.localHttpErrors, [])
  assert.deepEqual(report.blockedNonGet, [])
  report.success = true
} catch (error) {
  report.error = error.stack
  process.exitCode = 1
} finally {
  writeFileSync(join(output, 'report.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify({ output, pages: report.pages.length, pointerChecks: report.clicks.length, assetCount: report.assetCount, success: report.success, error: report.error }, null, 2))
  if (socket?.readyState === WebSocket.OPEN) {
    await send('Browser.close', {}, null).catch(() => {})
    socket.close()
  }
  browser.kill()
}