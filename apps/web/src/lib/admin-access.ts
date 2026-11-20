/**
 * Who may open /admin: the emails in the server-only ADMIN_EMAILS env var (comma-separated), set in
 * apps/web/.env.local and in Vercel. The address stays out of the public repository. Unset means nobody is an
 * admin: the check fails closed.
 * Used by proxy.ts for the optimistic redirect and by lib/admin.ts for the real check next to the data.
 */
export function isAdminEmail(email: unknown) {
  if (typeof email !== 'string' || !email) return false
  const admins = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
  return admins.includes(email.trim().toLowerCase())
}
