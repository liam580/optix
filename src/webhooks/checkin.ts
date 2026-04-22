import type { OptixWebhookBody } from '../lib/verify';

interface CheckinBody extends OptixWebhookBody {
  checkin_id: string;
  member_name: string;
  location_name: string;
  check_in_timestamp: string;
}

/**
 * new_checkin — fires when a golfer checks in to a Clubhouse location.
 * Use this to track real-time occupancy, log visits, trigger welcome messages.
 */
export async function handleNewCheckin(body: CheckinBody): Promise<void> {
  console.log(
    `[checkin] Check-in — Golfer: ${body.member_name}, ` +
    `Location: "${body.location_name}", Time: ${body.check_in_timestamp}`
  );
  // TODO: increment occupancy counter for location
  // TODO: trigger welcome message / digital sign
  // TODO: log visit for analytics
}

/**
 * cancel_checkin — fires when a check-in is cancelled.
 * Decrement occupancy tracking.
 */
export async function handleCancelCheckin(body: CheckinBody): Promise<void> {
  console.log(
    `[checkin] Check-in cancelled — Golfer: ${body.member_name}, ` +
    `Location: "${body.location_name}"`
  );
  // TODO: decrement occupancy counter
}
