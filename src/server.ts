import 'dotenv/config';
import express from 'express';
import { verifyWebhook } from './lib/verify';
import { dispatch } from './webhooks/index';
import type { OptixWebhookBody } from './lib/verify';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Parse URL-encoded form data — Optix sends all webhooks as application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'clubhouse-optix' });
});

// Main webhook endpoint — Optix POSTs all subscribed events here
app.post('/webhooks', (req, res) => {
  const body = req.body as OptixWebhookBody;

  if (!body.event || !body.request_signature) {
    return res.status(400).send('Missing required fields');
  }

  if (!verifyWebhook(body)) {
    console.warn(`[server] Invalid signature for event "${body.event}" — rejected`);
    return res.status(401).send('Invalid signature');
  }

  // Ack immediately — Optix requires a 2xx within 2 seconds.
  // All actual processing happens async after the response is sent.
  res.sendStatus(200);

  dispatch(body).catch((err) => {
    console.error(`[server] Error handling event "${body.event}":`, err);
  });
});

app.listen(PORT, () => {
  console.log(`Clubhouse Optix server listening on port ${PORT}`);
  console.log(`Webhook endpoint: POST http://localhost:${PORT}/webhooks`);
});
