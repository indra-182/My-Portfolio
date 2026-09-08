"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ProjectEvidenceField } from "./project-evidence";

const DESKTOP_PATH_QUERY = "(min-width: 1024px)";

function useDesktopPathLayout() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_PATH_QUERY);
    const updateLayout = () => setIsDesktop(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener?.("change", updateLayout);

    return () => mediaQuery.removeEventListener?.("change", updateLayout);
  }, []);

  return isDesktop;
}

function usePathNodeMotion(progress: MotionValue<number>, index: number) {
  const start = 0.08 + (index - 1) * 0.21;
  const end = start + 0.18;

  return {
    opacity: useTransform(progress, [0, start, end, 1], [0.4, 0.4, 1, 1]),
    y: useTransform(progress, [0, start, end, 1], ["1.5rem", "1.5rem", "0rem", "0rem"]),
  };
}

function getPathNodeOpacity(progress: number, index: number) {
  const start = 0.08 + (index - 1) * 0.21;
  const end = start + 0.18;

  if (progress <= start) {
    return 0.4;
  }

  if (progress >= end) {
    return 1;
  }

  return 0.4 + ((progress - start) / (end - start)) * 0.6;
}

export function AtlasPathNode({
  index,
  label,
  value,
  progress,
  animated,
}: {
  index: number;
  label: string;
  value: string;
  progress: MotionValue<number>;
  animated: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const motionRef = useRef<HTMLDivElement>(null);
  const nodeMotion = usePathNodeMotion(progress, index);

  useEffect(() => {
    motionRef.current?.setAttribute("data-motion-reduced", String(Boolean(reduceMotion)));
  }, [reduceMotion]);

  useMotionValueEvent(progress, "change", (value) => {
    motionRef.current?.setAttribute(
      "data-path-node-progress",
      animated && !reduceMotion ? getPathNodeOpacity(value, index).toFixed(3) : "1.000",
    );
  });

  return (
    <m.div
      ref={motionRef}
      className="atlas-path-node"
      data-atlas-motion="path"
      data-motion-reduced="false"
      data-path-node={index}
      data-path-node-progress={
        animated && !reduceMotion ? getPathNodeOpacity(progress.get(), index).toFixed(3) : "1.000"
      }
      style={animated && !reduceMotion ? nodeMotion : undefined}
    >
      <span className="atlas-path-index" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="atlas-path-label">{label}</h3>
        <p className="mt-2 max-w-[62ch] leading-[1.7] text-muted-foreground">{value}</p>
      </div>
    </m.div>
  );
}

/**
 * The desktop path uses the shell's document progress as its sole animation source. Keeping the
 * inline layout static until the media query resolves also means server-rendered content is never
 * hidden while the client island hydrates.
 */
export function AtlasPathSequence({ fields }: { fields: ReadonlyArray<ProjectEvidenceField> }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const isDesktop = useDesktopPathLayout();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start end", "end start"],
  });
  const railProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const railDotPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const animated = isDesktop && reduceMotion === false;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    shellRef.current?.setAttribute("data-path-progress", animated ? value.toFixed(3) : "1.000");
  });

  return (
    <div
      ref={shellRef}
      className="atlas-path-shell mt-12"
      data-path-mode="responsive"
      data-path-layout={isDesktop ? "desktop" : "inline"}
      data-path-motion={animated ? "scroll" : "static"}
      data-path-progress={animated ? scrollYProgress.get().toFixed(3) : "1.000"}
    >
      <div className="atlas-path-rail" aria-hidden="true">
        <m.span
          className="atlas-path-rail-line"
          data-atlas-motion="path"
          style={animated ? { scaleY: railProgress } : undefined}
        />
        <m.span
          className="atlas-path-rail-dot"
          data-atlas-motion="path"
          style={animated ? { top: railDotPosition } : undefined}
        />
      </div>
      <ol className="atlas-path-list">
        {fields.map((field, index) => (
          <li key={field.id} className="atlas-path-step">
            <AtlasPathNode
              index={index + 1}
              label={field.label}
              value={field.value}
              progress={scrollYProgress}
              animated={animated}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
