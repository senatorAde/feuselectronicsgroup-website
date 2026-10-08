const unavailable = 'Online inquiries are unavailable. Please email info@feuselectronicsgroup.com directly.'

export async function readContactAvailability(transport = fetch) {
  try {
    const response = await transport('/api/contact', { signal: AbortSignal.timeout(6000) })
    if (!response.ok) return false
    return (await response.json()).available === true
  } catch { return false }
}

export async function sendContact(payload, transport = fetch) {
  let response
  try {
    response = await transport('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    })
  } catch {
    throw new Error('The request timed out or could not reach the server. Delivery is unknown; check before retrying or use direct email.')
  }
  let body
  try { body = await response.json() } catch { throw new Error('The server returned an invalid response. Delivery is unknown; use direct email.') }
  if (!response.ok) throw new Error(response.status === 503 ? unavailable : body.error || 'The inquiry was not accepted. Please use direct email.')
  if (body.success !== true || body.delivery !== 'provider_accepted') throw new Error('The server did not confirm provider acceptance. Delivery is unknown; use direct email.')
  return body
}
