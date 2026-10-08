import { createHmac } from 'node:crypto'

export function contactAvailable(env = process.env) {
  return ['CONTACT_DELIVERY_ENABLED', 'CONTACT_PRIVACY_ENABLED', 'CONTACT_ABUSE_CONTROLS_ENABLED']
    .every(key => env[key] === 'true') &&
    ['RESEND_API_KEY', 'CONTACT_EMAIL_TO', 'CONTACT_EMAIL_FROM', 'CONTACT_RATE_LIMIT_TOKEN', 'CONTACT_RATE_LIMIT_SALT']
      .every(key => Boolean(env[key]?.trim())) &&
    validHttps(env.CONTACT_RATE_LIMIT_URL) && validHttps(env.CONTACT_SITE_ORIGIN)
}

function validHttps(raw) {
  try { return new URL(raw).protocol === 'https:' } catch { return false }
}

// A shared Redis counter is required. Process-local counters do not protect
// serverless instances across restarts or concurrent workers.
export async function consumeContactRate(req, env = process.env, transport = fetch) {
  const address = env.VERCEL === '1'
    ? req.headers?.['x-vercel-forwarded-for']?.split(',')[0]?.trim()
    : req.socket?.remoteAddress
  if (!address) throw new Error('Trusted client address unavailable')
  const hash = createHmac('sha256', env.CONTACT_RATE_LIMIT_SALT).update(address).digest('hex')
  const script = `local a=redis.call('INCR',KEYS[1]); if a==1 then redis.call('EXPIRE',KEYS[1],600) end; local b=redis.call('INCR',KEYS[2]); if b==1 then redis.call('EXPIRE',KEYS[2],600) end; if a>5 or b>100 then return 0 else return 1 end`
  const response = await transport(env.CONTACT_RATE_LIMIT_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.CONTACT_RATE_LIMIT_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['EVAL', script, '2', `feus-contact:${hash}`, 'feus-contact:global']),
    signal: AbortSignal.timeout(4000),
  })
  if (!response.ok) throw new Error('Rate protection unavailable')
  const body = await response.json()
  if (body.result !== 0 && body.result !== 1) throw new Error('Rate protection unavailable')
  return body.result === 1
}
