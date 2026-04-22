import { saveToken } from '../lib/tokenStore';
import type { OptixWebhookBody } from '../lib/verify';

interface AppInstallBody extends OptixWebhookBody {
  organization_token: string;
}

/**
 * app_install — fires when the Optix app is first installed.
 * Delivers the organization_token we use for all subsequent API calls.
 */
export async function handleAppInstall(body: AppInstallBody): Promise<void> {
  console.log(`[app] Installed for org: ${body.organization_id}`);
  saveToken(body.organization_token);
}

/**
 * app_uninstall — fires when the app is removed.
 * Clean up any org-specific state here (DB records, scheduled jobs, etc.).
 */
export async function handleAppUninstall(body: OptixWebhookBody): Promise<void> {
  console.log(`[app] Uninstalled for org: ${body.organization_id}`);
  // TODO: tear down org-specific resources
}

/**
 * organization_token_updated — fires when the org token is rotated.
 * Must persist the new token immediately; old token becomes invalid.
 */
export async function handleOrgTokenUpdated(body: AppInstallBody): Promise<void> {
  console.log(`[app] Token rotated for org: ${body.organization_id}`);
  saveToken(body.organization_token);
}
