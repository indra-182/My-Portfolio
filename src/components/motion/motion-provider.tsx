"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * One small browser island owns the Motion runtime for the whole portfolio.
 * `reducedMotion="user"` delegates transform and layout decisions to the
 * operating system preference while allowing useful opacity feedback.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
