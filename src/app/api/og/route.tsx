import { ImageResponse } from "next/og";
import { siteConfig } from "@/../site.config";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? siteConfig.fullName;
  const subtitle = searchParams.get("subtitle") ?? siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #0a0a0b 0%, #111113 50%, #1a1a1d 100%)",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: "radial-gradient(circle, #7c5cff66, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: "radial-gradient(circle, #00d4ff55, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#a1a1aa",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: "linear-gradient(135deg,#7c5cff,#00d4ff)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            H
          </div>
          hasif.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              maxWidth: 920,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#52525b",
            fontFamily: "monospace",
          }}
        >
          <span>Muhammad Hasif · Research engineer · Singapore</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
