import type { OptixWebhookBody } from '../lib/verify';

interface InvoiceBody extends OptixWebhookBody {
  invoice_id: string;
}

/**
 * invoice_paid — fires when a member pays an invoice.
 * Payload only includes invoice_id; fetch full details via GraphQL if needed.
 */
export async function handleInvoicePaid(body: InvoiceBody): Promise<void> {
  console.log(`[invoice] Invoice paid — ID: ${body.invoice_id}, Org: ${body.organization_id}`);
  // TODO: fetch invoice details via GraphQL for reconciliation
  // TODO: update accounting / POS records
  // TODO: send receipt to member
}

/**
 * invoice_updated — fires when an invoice is modified (amount, due date, etc.).
 */
export async function handleInvoiceUpdated(body: InvoiceBody): Promise<void> {
  console.log(`[invoice] Invoice updated — ID: ${body.invoice_id}`);
  // TODO: sync updated invoice to accounting system
  // TODO: notify member if amount changed
}
