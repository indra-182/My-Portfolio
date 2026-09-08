"use client";

import { m, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

export function AtlasHeroMotion() {
  const reduceMotion = useReducedMotion();
  const motionRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const routeX = useTransform(pointerX, [-1, 1], [-10, 10]);
  const routeY = useTransform(pointerY, [-1, 1], [-8, 8]);
  const fogX = useTransform(pointerX, [-1, 1], [8, -8]);
  const fogY = useTransform(pointerY, [-1, 1], [6, -6]);

  useEffect(() => {
    motionRef.current?.setAttribute("data-motion-reduced", String(Boolean(reduceMotion)));
    if (reduceMotion) return;

    const updatePointer = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div
      ref={motionRef}
      className="atlas-hero-motion"
      data-atlas-motion="hero"
      data-motion-reduced="false"
      aria-hidden="true"
    >
      <m.div className="atlas-hero-route-motion" style={{ x: routeX, y: routeY }}>
        <div className="atlas-hero-route" />
      </m.div>
      <m.div className="atlas-hero-fog-motion" style={{ x: fogX, y: fogY }}>
        <div className="atlas-hero-fog" />
      </m.div>
    </div>
  );
}

export function AtlasSignature({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  const motionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    motionRef.current?.setAttribute("data-motion-reduced", String(Boolean(reduceMotion)));
  }, [reduceMotion]);

  return (
    <m.span
      ref={motionRef}
      data-atlas-motion="signature"
      data-motion-reduced="false"
      initial={false}
      whileHover={
        reduceMotion
          ? undefined
          : { fontVariationSettings: '"CASL" 0.45, "MONO" 0.08, "slnt" 0, "wght" 760' }
      }
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </m.span>
  );
}
