import type { OptixWebhookBody } from '../lib/verify';

interface PlanBody extends OptixWebhookBody {
  account_plan_id: string;
  plan_template_name: string;
  subscribers: string;
  price?: string;
  start_datetime?: string;
  status?: string;
}

/**
 * new_plan_subscription — golfer or group starts a Clubhouse membership.
 */
export async function handleNewPlanSubscription(body: PlanBody): Promise<void> {
  console.log(
    `[plan] New subscription — Plan: "${body.plan_template_name}", ` +
    `Subscribers: ${body.subscribers}, Starts: ${body.start_datetime}`
  );
  // TODO: send welcome / onboarding email for new membership tier
  // TODO: sync membership status to CRM
  // TODO: grant any tier-specific perks (e.g. locker assignment)
}

/**
 * cancel_plan_subscription — membership ended or cancelled.
 */
export async function handleCancelPlanSubscription(body: PlanBody): Promise<void> {
  console.log(
    `[plan] Subscription cancelled — Plan: "${body.plan_template_name}", ` +
    `Subscribers: ${body.subscribers}`
  );
  // TODO: send cancellation confirmation
  // TODO: revoke tier-specific access
  // TODO: run win-back flow if appropriate
}

/**
 * plan_subscription_changed — membership tier or price changed.
 */
export async function handlePlanSubscriptionChanged(body: PlanBody): Promise<void> {
  console.log(
    `[plan] Subscription changed — Plan: "${body.plan_template_name}", ` +
    `Status: ${body.status}, Price: ${body.price}`
  );
  // TODO: update CRM with new membership tier
  // TODO: adjust any tier-gated access
}

/**
 * plan_ending_soon — membership is about to expire. Good for renewal nudges.
 */
export async function handlePlanEndingSoon(body: PlanBody): Promise<void> {
  console.log(
    `[plan] Subscription ending soon — Plan: "${body.plan_template_name}", ` +
    `Subscribers: ${body.subscribers}`
  );
  // TODO: send renewal reminder email/SMS
}
