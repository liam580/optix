import type { OptixWebhookBody } from '../lib/verify';

interface AssignmentBody extends OptixWebhookBody {
  assignment_id: string;
  resource_name: string;  // simulator bay name in Clubhouse
  owner_name: string;
  start_datetime?: string;
  end_datetime?: string;
  status: string;
}

/**
 * assignment_started — a long-term bay allocation (league slot, recurring booking)
 * transitions from 'upcoming' to 'active'.
 */
export async function handleAssignmentStarted(body: AssignmentBody): Promise<void> {
  console.log(
    `[assignment] Assignment active — Bay: "${body.resource_name}", ` +
    `Owner: ${body.owner_name}, Start: ${body.start_datetime}`
  );
  // TODO: mark bay as occupied in occupancy tracking
  // TODO: notify assigned member/group that their slot is starting
}

/**
 * assignment_ended — a long-term allocation transitions from 'active' to 'ended'.
 * Bay slot is now available again.
 */
export async function handleAssignmentEnded(body: AssignmentBody): Promise<void> {
  console.log(
    `[assignment] Assignment ended — Bay: "${body.resource_name}", ` +
    `Owner: ${body.owner_name}, End: ${body.end_datetime}`
  );
  // TODO: mark bay as available in occupancy tracking
}
