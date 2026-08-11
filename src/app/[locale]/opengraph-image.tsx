import { ImageResponse } from "next/og";
import { getPortfolio } from "@/lib/get-portfolio";
import { isLocale } from "@/i18n/config";

export const alt = "INDRA.DEV — Mahadi Indra Manurung";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = isLocale(value) ? value : "id";
  const portfolio = getPortfolio(locale);

  return new ImageResponse(
    <div
      style={{
        background: "#0B0D10",
        color: "#F5F7FA",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "#60A5FA",
          display: "flex",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.18em",
        }}
      >
        INDRA.DEV
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ color: "#A6ADB8", display: "flex", fontSize: 24 }}>
          {portfolio.profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: "-0.04em" }}>
          {portfolio.profile.name}
        </div>
        <div style={{ color: "#A6ADB8", display: "flex", fontSize: 26, maxWidth: 900 }}>
          {portfolio.profile.valueProposition}
        </div>
      </div>
      <div style={{ color: "#60A5FA", display: "flex", fontSize: 22 }}>
        {locale.toUpperCase()} · Bogor, Indonesia
      </div>
    </div>,
    size,
  );
}
