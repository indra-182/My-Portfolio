import { Button } from "@/components/ui/button";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle({ label }: { label: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      data-theme-toggle
      className="text-muted-foreground hover:text-foreground"
    >
      <LuSun aria-hidden="true" data-theme-icon="light" className="size-4" />
      <LuMoon aria-hidden="true" data-theme-icon="dark" className="size-4" />
    </Button>
  );
}
