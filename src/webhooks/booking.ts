import type { OptixWebhookBody } from '../lib/verify';

interface BookingBody extends OptixWebhookBody {
  booking_id: string;
  workspace_name: string;  // simulator bay name in Clubhouse
  member_name: string;
  venue_name: string;
  check_in_datetime: string;
  workspace_type?: string;
}

/**
 * new_member_booking — fires when a golfer reserves a simulator bay.
 * Good place to: send confirmation SMS/email, update occupancy tracking,
 * sync to an external calendar, notify staff.
 */
export async function handleNewBooking(body: BookingBody): Promise<void> {
  console.log(
    `[booking] New bay reservation — Bay: "${body.workspace_name}", ` +
    `Golfer: ${body.member_name}, Location: ${body.venue_name}, ` +
    `Time: ${body.check_in_datetime}, Booking ID: ${body.booking_id}`
  );
  // TODO: send confirmation notification to member
  // TODO: update real-time bay occupancy display
  // TODO: sync to external calendar / POS system
}

/**
 * member_booking_updated — fires when a reservation is modified
 * (time change, invitees added, payment updated, etc.).
 */
export async function handleBookingUpdated(body: BookingBody): Promise<void> {
  console.log(
    `[booking] Booking updated — ID: ${body.booking_id}, ` +
    `Bay: "${body.workspace_name}", Time: ${body.check_in_datetime}`
  );
  // TODO: send updated confirmation to member
  // TODO: re-sync to external calendar
}

/**
 * member_booking_cancelled — fires when a bay reservation is cancelled.
 * Bay slot becomes available again.
 */
export async function handleBookingCancelled(body: BookingBody): Promise<void> {
  console.log(
    `[booking] Booking cancelled — ID: ${body.booking_id}, ` +
    `Bay: "${body.workspace_name}", Golfer: ${body.member_name}`
  );
  // TODO: notify member of cancellation
  // TODO: update occupancy / open slot back up
  // TODO: trigger waitlist notification if applicable
}
