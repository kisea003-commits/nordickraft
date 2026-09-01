export const ADMIN_COOKIE_NAME = "nk_admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 12; // 12 timer

export function getAdminSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET er ikke satt i miljøvariablene.");
  }
  return secret;
}

export function isAdminPasswordCorrect(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
