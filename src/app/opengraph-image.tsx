import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Buddy Tech — AI coaching for youth sports, from your phone.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [logo, screenshot] = await Promise.all([
    readFile(join(process.cwd(), "public/pngtilted-white.png")),
    readFile(join(process.cwd(), "public/v2-scorecard.png")),
  ]);

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const screenshotSrc = `data:image/png;base64,${screenshot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(900px circle at 18% 12%, rgba(37,99,235,0.35), transparent 55%), radial-gradient(700px circle at 82% 8%, rgba(34,197,94,0.22), transparent 55%), linear-gradient(135deg, #070A12 0%, #0B1220 50%, #070A12 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "64px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
            <img src={logoSrc} alt="" width={52} height={52} />
            <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.08em", opacity: 0.75 }}>
              BUDDY TECH
            </span>
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 620,
            }}
          >
            AI coaching for youth sports,
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#86efac",
              maxWidth: 620,
            }}
          >
            from your phone.
          </div>
          <div style={{ marginTop: 28, fontSize: 22, opacity: 0.65, maxWidth: 520, lineHeight: 1.4 }}>
            Computer vision coaching for hockey, lacrosse, and more.
          </div>
          <div style={{ marginTop: 36, fontSize: 18, opacity: 0.45 }}>
            buddysports.app
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 420,
            paddingRight: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 14,
              borderRadius: 36,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            }}
          >
            <div
              style={{
                display: "flex",
                overflow: "hidden",
                borderRadius: 28,
                background: "#111827",
              }}
            >
              <img
                src={screenshotSrc}
                alt=""
                width={260}
                height={563}
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
