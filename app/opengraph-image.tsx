import { ImageResponse } from "next/og";
import { hero, person } from "@/lib/content";

// Rendered once at build time (static export) and used for Open Graph + Twitter cards.
export const dynamic = "force-static";
export const alt = `${person.name} — ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const [line1, line2] = hero.headline;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(120% 80% at 50% 120%, #2a4208 0%, #11190a 35%, #07080a 70%)",
          color: "#F2F4F5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: -1,
              backgroundImage: "linear-gradient(90deg, #B6FF3B, #F5E642)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            WA
          </div>
          <div style={{ fontSize: 30, color: "#8A9099" }}>{person.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>
            {line1}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.1,
              backgroundImage: "linear-gradient(90deg, #B6FF3B, #F5E642)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {line2}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#8A9099" }}>
          {person.role} · {person.sub}
        </div>
      </div>
    ),
    size,
  );
}
