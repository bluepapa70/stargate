import { ImageResponse } from "next/og";
import { getCompatibilityInsight } from "@/lib/compatibility";
import { getZodiacInfoByKey, zodiacSigns } from "@/lib/zodiac";

export const dynamic = "force-static";

export function generateStaticParams() {
  return zodiacSigns.flatMap((sign) =>
    zodiacSigns
      .filter((match) => match.key !== sign.key)
      .map((match) => ({ sign: sign.key, match: match.key })),
  );
}

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type ImageProps = {
  params: Promise<{
    sign: string;
    match: string;
  }>;
};

export default async function Image({ params }: ImageProps) {
  const { sign, match } = await params;
  const primarySign = getZodiacInfoByKey(sign);
  const partnerSign = getZodiacInfoByKey(match);

  if (!primarySign || !partnerSign) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#2d1d17",
            color: "#fff5ea",
            fontSize: 56,
          }}
        >
          StarGate Compatibility
        </div>
      ),
      size,
    );
  }

  const insight = getCompatibilityInsight(primarySign, partnerSign);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at top left, rgba(255, 214, 187, 0.95), transparent 24%), linear-gradient(135deg, #f7f1ea 0%, #f3e2cf 45%, #ead7c7 100%)",
          color: "#2d1d17",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px" }}>
            <div style={{ fontSize: 24, letterSpacing: "0.28em", textTransform: "uppercase", color: "#793613" }}>
              StarGate Compatibility
            </div>
            <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.04 }}>
              {`${primarySign.name} × ${partnerSign.name}`}
            </div>
            <div style={{ fontSize: 32, lineHeight: 1.45, color: "#5d4a3f" }}>{insight.summary}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "220px",
              height: "220px",
              borderRadius: "999px",
              background: "#2d1d17",
              color: "#fff5ea",
            }}
          >
            <div style={{ fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: "#f2bf94" }}>
              Score
            </div>
            <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1 }}>{String(insight.score)}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "10px",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.72)",
              padding: "24px 28px",
            }}
          >
            <div style={{ fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: "#793613" }}>
              Label
            </div>
            <div style={{ fontSize: 34, fontWeight: 700 }}>{insight.label}</div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "10px",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.72)",
              padding: "24px 28px",
            }}
          >
            <div style={{ fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: "#793613" }}>
              Key Advice
            </div>
            <div style={{ fontSize: 24, lineHeight: 1.5 }}>{insight.advice}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}