import { handleAppInstall, handleAppUninstall, handleOrgTokenUpdated } from './app';
import { handleNewBooking, handleBookingUpdated, handleBookingCancelled } from './booking';
import { handleNewMember, handleMemberUpdated, handleMemberDeleted } from './member';
import { handleNewCheckin, handleCancelCheckin } from './checkin';
import {
  handleNewPlanSubscription,
  handleCancelPlanSubscription,
  handlePlanSubscriptionChanged,
  handlePlanEndingSoon,
} from './plan';
import { handleInvoicePaid, handleInvoiceUpdated } from './invoice';
import { handleNewTeamMember, handleTeamMemberDeleted, handleTeamUpdated } from './team';
import { handleAssignmentStarted, handleAssignmentEnded } from './assignment';
import {
  handleNewSale,
  handleNewIssue,
  handleNewLead,
  handleAccountTypeUpdated,
} from './misc';
import type { OptixWebhookBody } from '../lib/verify';

type HandlerFn = (body: OptixWebhookBody) => Promise<void>;

const HANDLERS: Record<string, HandlerFn> = {
  // App lifecycle
  app_install: handleAppInstall as HandlerFn,
  app_uninstall: handleAppUninstall,
  organization_token_updated: handleOrgTokenUpdated as HandlerFn,

  // Bookings (most critical for Clubhouse Golf — bay reservations)
  new_member_booking: handleNewBooking as HandlerFn,
  member_booking_updated: handleBookingUpdated as HandlerFn,
  member_booking_cancelled: handleBookingCancelled as HandlerFn,

  // Members / golfers
  new_member: handleNewMember as HandlerFn,
  member_updated: handleMemberUpdated as HandlerFn,
  member_deleted: handleMemberDeleted as HandlerFn,

  // Check-ins / facility occupancy
  new_checkin: handleNewCheckin as HandlerFn,
  cancel_checkin: handleCancelCheckin as HandlerFn,

  // Memberships / plans
  new_plan_subscription: handleNewPlanSubscription as HandlerFn,
  cancel_plan_subscription: handleCancelPlanSubscription as HandlerFn,
  plan_subscription_changed: handlePlanSubscriptionChanged as HandlerFn,
  plan_ending_soon: handlePlanEndingSoon as HandlerFn,

  // Invoices / payments
  invoice_paid: handleInvoicePaid as HandlerFn,
  invoice_updated: handleInvoiceUpdated as HandlerFn,

  // Teams / corporate accounts
  new_team_member: handleNewTeamMember as HandlerFn,
  team_member_deleted: handleTeamMemberDeleted as HandlerFn,
  team_updated: handleTeamUpdated as HandlerFn,

  // Long-term bay allocations
  assignment_started: handleAssignmentStarted as HandlerFn,
  assignment_ended: handleAssignmentEnded as HandlerFn,

  // Misc
  new_sale: handleNewSale as HandlerFn,
  new_issue: handleNewIssue as HandlerFn,
  new_lead: handleNewLead as HandlerFn,
  account_type_updated: handleAccountTypeUpdated as HandlerFn,
};

export async function dispatch(body: OptixWebhookBody): Promise<void> {
  const handler = HANDLERS[body.event];
  if (!handler) {
    console.warn(`[webhook] Unhandled event: "${body.event}"`);
    return;
  }
  await handler(body);
}
