import type { OptixWebhookBody } from '../lib/verify';

interface SaleBody extends OptixWebhookBody {
  product_sale_id: string;
  product: string;
  account_name: string;
  quantity: string;
  total: string;
}

interface IssueBody extends OptixWebhookBody {
  issue_id: string;
  location_id: string;
  category1: string;
  category2?: string;
  notes?: string;
}

interface LeadBody extends OptixWebhookBody {
  member_id: string;
  first_name: string;
  email: string;
  venue_name: string;
}

interface AccountTypeBody extends OptixWebhookBody {
  account_id: string;
  member_id?: string;
  type_label_name: string;
}

/**
 * new_sale — a product sale is made (pro shop, F&B, merchandise, etc.).
 */
export async function handleNewSale(body: SaleBody): Promise<void> {
  console.log(
    `[sale] New sale — Product: "${body.product}", ` +
    `Account: ${body.account_name}, Qty: ${body.quantity}, Total: ${body.total}`
  );
  // TODO: sync to POS / inventory system
  // TODO: update revenue reporting
}

/**
 * new_issue — a member reports a problem (equipment, facility, etc.).
 */
export async function handleNewIssue(body: IssueBody): Promise<void> {
  console.log(
    `[issue] New issue reported — Location: ${body.location_id}, ` +
    `Category: ${body.category1} / ${body.category2}, Notes: "${body.notes}"`
  );
  // TODO: create ticket in support system (Zendesk, Linear, etc.)
  // TODO: alert facility manager
}

/**
 * new_lead — a prospective member is added (note: 1-hour delivery delay from Optix).
 */
export async function handleNewLead(body: LeadBody): Promise<void> {
  console.log(
    `[lead] New lead — Name: ${body.first_name}, Email: ${body.email}, ` +
    `Venue: ${body.venue_name}`
  );
  // TODO: add to CRM lead pipeline
  // TODO: trigger outreach sequence
}

/**
 * account_type_updated — a member or team's account type/tier changes.
 */
export async function handleAccountTypeUpdated(body: AccountTypeBody): Promise<void> {
  console.log(
    `[account] Type updated — Account: ${body.account_id}, ` +
    `New type: "${body.type_label_name}"`
  );
  // TODO: sync new account type to CRM
  // TODO: adjust access level if type gates features
}
