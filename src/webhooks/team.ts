import type { OptixWebhookBody } from '../lib/verify';

interface TeamBody extends OptixWebhookBody {
  team_id: string;
  account_id?: string;
  user_name?: string;
  user_email?: string;
  is_admin?: string;
}

/**
 * new_team_member — a golfer is added to a group/corporate account.
 */
export async function handleNewTeamMember(body: TeamBody): Promise<void> {
  console.log(
    `[team] Member added — Team: ${body.team_id}, ` +
    `User: ${body.user_name} (${body.user_email}), Admin: ${body.is_admin}`
  );
  // TODO: sync team roster to CRM
  // TODO: notify team admin
}

/**
 * team_member_deleted — a golfer is removed from a group/corporate account.
 */
export async function handleTeamMemberDeleted(body: TeamBody): Promise<void> {
  console.log(
    `[team] Member removed — Team: ${body.team_id}, ` +
    `User: ${body.user_name} (${body.user_email})`
  );
  // TODO: update team roster in CRM
}

/**
 * team_updated — team profile updated (name, settings, etc.).
 */
export async function handleTeamUpdated(body: TeamBody): Promise<void> {
  console.log(`[team] Team updated — ID: ${body.team_id}, Account: ${body.account_id}`);
  // TODO: sync updated team info to CRM
}
