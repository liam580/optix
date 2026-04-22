import type { OptixWebhookBody } from '../lib/verify';

interface MemberBody extends OptixWebhookBody {
  member_id: string;
  user_id?: string;
  first_name?: string;
  email: string;
  venue_name?: string;
  account_id?: string;
}

/**
 * new_member — fires when a golfer joins the Clubhouse organization.
 * Good place to: add to CRM, send welcome email, provision access, etc.
 */
export async function handleNewMember(body: MemberBody): Promise<void> {
  console.log(
    `[member] New member joined — ID: ${body.member_id}, ` +
    `Email: ${body.email}, Venue: ${body.venue_name}`
  );
  // TODO: add member to CRM / mailing list
  // TODO: send Clubhouse welcome email
  // TODO: provision any external system access
}

/**
 * member_updated — fires when a golfer updates their profile.
 */
export async function handleMemberUpdated(body: MemberBody): Promise<void> {
  console.log(
    `[member] Member updated — ID: ${body.member_id}, ` +
    `Account: ${body.account_id}`
  );
  // TODO: sync updated profile to CRM
}

/**
 * member_deleted — fires when a member is removed from the org.
 */
export async function handleMemberDeleted(body: MemberBody): Promise<void> {
  console.log(
    `[member] Member deleted — ID: ${body.member_id}, ` +
    `Email: ${body.email}`
  );
  // TODO: remove from CRM / mailing lists
  // TODO: revoke external system access
}
