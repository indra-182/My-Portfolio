import { ImageResponse } from "next/og";
import { portfolioByLocale, portfolioFacts } from "@/content/portfolio";
import { requireLocale } from "@/i18n/route-locale";

export const alt = `INDRA.DEV: ${portfolioFacts.profile.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = requireLocale(value);
  const portfolio = portfolioByLocale[locale];

  return new ImageResponse(
    <div
      style={{
        background: "#08090D",
        color: "#F4F1E9",
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
          color: "#91B9F3",
          display: "flex",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.18em",
        }}
      >
        INDRA.DEV
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ color: "#A9ADBA", display: "flex", fontSize: 24 }}>
          {portfolio.profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: "-0.04em" }}>
          {portfolio.profile.name}
        </div>
        <div style={{ color: "#A9ADBA", display: "flex", fontSize: 26, maxWidth: 900 }}>
          {portfolio.profile.valueProposition}
        </div>
      </div>
      <div style={{ color: "#91B9F3", display: "flex", fontSize: 22 }}>
        {locale.toUpperCase()} · {portfolio.profile.location.locality},{" "}
        {portfolio.profile.location.countryName}
      </div>
    </div>,
    size,
  );
}
