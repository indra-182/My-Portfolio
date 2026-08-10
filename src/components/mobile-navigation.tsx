"use client";

import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type MobileNavigationItem = { label: string; href: string; active?: boolean };

export function MobileNavigation({
  items,
  locale,
  openLabel = "Open menu",
}: {
  items: MobileNavigationItem[];
  locale: Locale;
  openLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" size="icon-lg" aria-label={openLabel} className="md:hidden" />
        }
      >
        <LuMenu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(22rem,calc(100%-2rem))]">
        <SheetHeader className="border-b border-border pb-5">
          <SheetTitle className="font-mono text-sm tracking-[0.18em]">INDRA.DEV</SheetTitle>
          <SheetDescription>
            {locale === "id" ? "Navigasi portfolio" : "Portfolio navigation"}
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="flex flex-col gap-2 px-4 py-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="flex min-h-11 items-center border-b border-border/70 text-base font-medium">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
