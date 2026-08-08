/**
 * FEUS unified request client — web-chat channel adapter (presentation only).
 *
 * Implements the client side of the `POST /feus/requests` contract served by
 * `modules.hello_feus.api.handle_feus_request` in FEUS-Enterprise-Distribution.
 *
 * This module holds NO policy, capability, or session authority. It only:
 *   - shapes the request payload for the "web-chat" channel,
 *   - carries the session_id returned by the backend for continuity,
 *   - surfaces the backend's truthful status vocabulary unchanged.
 *
 * If the backend is not deployed (the current public posture), callers
 * receive `{ status: "CHANNEL_UNAVAILABLE" }` — the UI must show that
 * truthfully and must never simulate a successful FEUS response.
 */

const DEFAULT_ENDPOINT = import.meta.env?.VITE_FEUS_REQUESTS_URL || null;

/** Response statuses passed through verbatim from the FEUS ingress. */
export const FEUS_STATUSES = Object.freeze([
  'EXECUTED',
  'GUIDANCE',
  'ROUTED_AWAITING_EXECUTOR',
  'APPROVAL_REQUIRED',
  'DENIED',
  'CAPABILITY_UNAVAILABLE',
  'CLARIFICATION_REQUIRED',
  'ERROR',
]);

export function createFeusRequestClient({ endpoint = DEFAULT_ENDPOINT, fetchImpl = globalThis.fetch } = {}) {
  let sessionId = null;

  async function send({ text, tenantId, requesterReference, targetReference }) {
    if (!endpoint) {
      return {
        status: 'CHANNEL_UNAVAILABLE',
        message:
          'The FEUS web chat backend is not deployed for this site. ' +
          'No request was sent and no result was simulated.',
        session: null,
      };
    }
    const payload = {
      channel_id: 'web-chat',
      tenant_id: tenantId,
      requester_reference: requesterReference,
      text,
    };
    if (sessionId) payload.session_id = sessionId;
    if (targetReference) payload.target_reference = targetReference;

    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await response.json();
    if (body?.session?.session_id) sessionId = body.session.session_id;
    return body;
  }

  return {
    send,
    get sessionId() {
      return sessionId;
    },
    get available() {
      return Boolean(endpoint);
    },
  };
}
