import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/../site.config";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  company: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
  honeypot: z.string().optional(),
});

export const runtime = "nodejs";

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many messages. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the fields and try again.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.honeypot && data.honeypot.trim().length > 0) {
    // Silently accept, don't tell bots why.
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY missing, logging payload instead of sending:");
    console.warn(JSON.stringify({ from: data.email, name: data.name, message: data.message }, null, 2));
    return NextResponse.json(
      { ok: true, dev: true, note: "Dev stub. Configure RESEND_API_KEY to send real emails." }
    );
  }

  const resend = new Resend(apiKey);

  const subject = `Portfolio contact · ${data.name}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;background:#0a0a0b;color:#f5f5f7;padding:24px">
      <h2 style="margin:0 0 8px">${escape(data.name)} <span style="color:#a1a1aa;font-weight:400">(${escape(data.email)})</span></h2>
      ${data.company ? `<div style="color:#a1a1aa;margin-bottom:12px">${escape(data.company)}</div>` : ""}
      <div style="white-space:pre-wrap;line-height:1.55;border-left:3px solid #7c5cff;padding:8px 12px;background:#111113">${escape(data.message)}</div>
      <hr style="border:none;border-top:1px solid #2a2a2f;margin:20px 0" />
      <div style="color:#52525b;font-size:12px">IP: ${escape(ip)} · ${new Date().toISOString()}</div>
    </div>`;

  const text = `${data.name} <${data.email}>${data.company ? ` @ ${data.company}` : ""}\n\n${data.message}\n\n---\nIP: ${ip} · ${new Date().toISOString()}`;

  try {
    const res = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: data.email,
      subject,
      html,
      text,
    });
    if (res.error) {
      console.error("[contact] resend error", res.error);
      return NextResponse.json({ error: "Email provider rejected the send." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, id: res.data?.id });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json({ error: "Unexpected error sending email." }, { status: 500 });
  }
}
