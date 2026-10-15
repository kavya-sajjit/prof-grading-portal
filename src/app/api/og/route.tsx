import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * Dynamic OpenGraph (OG) Image Generation API Route (Unit VI)
 * Generates high-res dynamic social sharing images on the fly.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Teacher Grading Portal";
    const student = searchParams.get("student") || "KAVYA SAJJIT";
    const score = searchParams.get("score") || "55/60";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#161e2e",
            backgroundImage: "radial-gradient(rgba(195, 160, 125, 0.15) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            padding: "60px",
            fontFamily: "sans-serif",
            color: "#f4efe8",
          }}
        >
          {/* Header Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "rgba(201, 169, 138, 0.15)",
              border: "1px solid rgba(201, 169, 138, 0.3)",
              padding: "10px 20px",
              borderRadius: "30px",
              fontSize: "18px",
              fontWeight: 600,
              color: "#c9a98a",
            }}
          >
            <span>Grading Portal Report &bull; Next.js OG Engine</span>
          </div>

          {/* Main Title & Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                maxWidth: "900px",
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: "28px", color: "#9ca3af" }}>
              Evaluation Report for <strong style={{ color: "#c9a98a" }}>{student}</strong>
            </div>
          </div>

          {/* Footer Metadata Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
            }}
          >
            <div style={{ fontSize: "20px", color: "#6b7280" }}>
              App Router &bull; Zustand &bull; Zod Validation
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                backgroundColor: "#c9a98a",
                color: "#0f151d",
                padding: "8px 20px",
                borderRadius: "10px",
              }}
            >
              Grade: {score}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response(`Failed to generate OG image: ${String(error)}`, { status: 500 });
  }
}
