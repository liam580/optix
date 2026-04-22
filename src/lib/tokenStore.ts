import fs from 'fs';
import path from 'path';

const TOKEN_FILE = path.resolve(process.cwd(), '.org-token');

/**
 * Persists the organization token to disk so it survives server restarts.
 * Called whenever app_install or organization_token_updated fires.
 *
 * In production, swap this for a database or secrets manager write.
 */
export function saveToken(token: string): void {
  fs.writeFileSync(TOKEN_FILE, token, 'utf8');
  process.env.ORG_TOKEN = token;
  console.log('[tokenStore] Organization token updated and saved.');
}

/**
 * Returns the current organization token.
 * Priority: env var → disk file.
 */
export function getToken(): string {
  if (process.env.ORG_TOKEN) return process.env.ORG_TOKEN;
  if (fs.existsSync(TOKEN_FILE)) {
    const token = fs.readFileSync(TOKEN_FILE, 'utf8').trim();
    process.env.ORG_TOKEN = token;
    return token;
  }
  throw new Error(
    'No organization token found. Ensure the app is installed in Optix or set ORG_TOKEN in .env'
  );
}
