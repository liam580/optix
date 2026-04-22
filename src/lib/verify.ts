import crypto from 'crypto';

/**
 * Verifies an Optix webhook request_signature.
 * Optix signs every webhook as SHA1(client_id + secret + created_timestamp).
 * Always verify before processing any webhook payload.
 */
export function verifySignature(
  clientId: string,
  secret: string,
  createdTimestamp: string,
  requestSignature: string
): boolean {
  const expected = crypto
    .createHash('sha1')
    .update(clientId + secret + createdTimestamp)
    .digest('hex');
  return expected === requestSignature;
}

export interface OptixWebhookBody {
  client_id: string;
  created_timestamp: string;
  organization_id: string;
  event: string;
  request_signature: string;
  [key: string]: string | undefined;
}

export function verifyWebhook(body: OptixWebhookBody): boolean {
  const secret = process.env.CLIENT_SECRET;
  if (!secret) throw new Error('CLIENT_SECRET env var not set');
  return verifySignature(
    body.client_id,
    secret,
    body.created_timestamp,
    body.request_signature
  );
}
