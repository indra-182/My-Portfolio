import type { Metadata } from "next";
import { SiteInteractions } from "@/components/site-interactions";
import "./globals.css";

export const metadata: Metadata = {
  title: "INDRA.DEV: Mahadi Indra Manurung",
  description: "Senior Frontend Engineer portfolio of Mahadi Indra Manurung.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <SiteInteractions />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
