type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export function rateLimit(ip: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const b = store.get(ip);
  if (!b || b.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  if (b.count >= limit) {
    return { ok: false, remaining: 0, resetAt: b.resetAt };
  }
  b.count += 1;
  return { ok: true, remaining: limit - b.count, resetAt: b.resetAt };
}
