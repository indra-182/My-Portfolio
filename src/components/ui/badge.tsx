import * as React from "react";

const badgeClasses =
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium whitespace-nowrap text-foreground transition-colors duration-[var(--motion-fast)] [&>svg]:pointer-events-none [&>svg]:size-3";

type BadgeProps = React.ComponentProps<"span">;

export function Badge({ className, ...props }: BadgeProps) {
  return <span {...props} className={[badgeClasses, className].filter(Boolean).join(" ")} />;
}
