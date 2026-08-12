"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";
  const targetTheme = isDark ? "light" : "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const Icon = isDark ? LuSun : LuMoon;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(targetTheme)}
      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-transparent text-muted-foreground transition-[background-color,color,transform] duration-[var(--motion-fast)] hover:-translate-y-0.5 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] active:translate-y-0"
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}
