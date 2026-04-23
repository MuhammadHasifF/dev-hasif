import { NextResponse } from "next/server";

// Stub — real Resend-backed implementation lands in the contact-api commit.
export async function POST(req: Request) {
  try {
    await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  return NextResponse.json(
    { ok: false, error: "Contact endpoint not yet configured." },
    { status: 503 }
  );
}
