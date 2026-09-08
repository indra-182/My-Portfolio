import { render, waitFor } from "@testing-library/react";
import { motionValue } from "motion/react";
import type { MotionValue } from "motion/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { AtlasPathSequence } from "./path-motion";

const mocks = vi.hoisted(() => ({
  scrollProgress: undefined as MotionValue<number> | undefined,
  reduceMotion: false,
}));

vi.mock("motion/react", async () => {
  const actual = await vi.importActual<typeof import("motion/react")>("motion/react");

  return {
    ...actual,
    useReducedMotion: () => mocks.reduceMotion,
    useScroll: () => {
      const progress = mocks.scrollProgress ?? actual.motionValue(0);

      return {
        scrollX: actual.motionValue(0),
        scrollY: actual.motionValue(0),
        scrollXProgress: actual.motionValue(0),
        scrollYProgress: progress,
      };
    },
  };
});

const fields = [
  { id: "problem" as const, label: "Problem", value: "A complex workflow." },
  { id: "ownership" as const, label: "Ownership", value: "A clear owner." },
  { id: "delivery" as const, label: "Delivery", value: "A tested release." },
  { id: "outcome" as const, label: "Outcome", value: "A reliable product." },
];

function mockDesktopMatchMedia(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const query = {
    matches,
    media: "(min-width: 1024px)",
    onchange: null,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener);
    },
    dispatchEvent: (event: Event) => {
      listeners.forEach((listener) => listener(event as MediaQueryListEvent));
      return true;
    },
  } as MediaQueryList;

  vi.stubGlobal("matchMedia", () => query);
}

describe("AtlasPathSequence", () => {
  afterEach(() => {
    mocks.scrollProgress = undefined;
    mocks.reduceMotion = false;
    vi.unstubAllGlobals();
  });

  test("maps scroll progress to the desktop rail and evidence nodes", async () => {
    const scrollProgress = motionValue(0);
    mocks.scrollProgress = scrollProgress;
    mockDesktopMatchMedia(true);

    const { container } = render(<AtlasPathSequence fields={fields} />);
    const shell = container.querySelector<HTMLElement>(".atlas-path-shell")!;
    const firstNode = container.querySelector<HTMLElement>(".atlas-path-node")!;
    const railLine = container.querySelector<HTMLElement>(".atlas-path-rail-line")!;

    await waitFor(() => expect(shell).toHaveAttribute("data-path-motion", "scroll"));
    expect(shell).toHaveAttribute("data-path-progress", "0.000");
    expect(firstNode).toHaveAttribute("data-path-node-progress", "0.400");

    scrollProgress.set(1);

    await waitFor(() => expect(shell).toHaveAttribute("data-path-progress", "1.000"));
    expect(firstNode).toHaveAttribute("data-path-node-progress", "1.000");
    expect(railLine).toHaveAttribute("data-atlas-motion", "path");
  });

  test("keeps the complete final state without motion when reduced motion is requested", async () => {
    mocks.reduceMotion = true;
    mockDesktopMatchMedia(true);

    const { container } = render(<AtlasPathSequence fields={fields} />);
    const shell = container.querySelector<HTMLElement>(".atlas-path-shell")!;
    const firstNode = container.querySelector<HTMLElement>(".atlas-path-node")!;
    const railLine = container.querySelector<HTMLElement>(".atlas-path-rail-line")!;

    await waitFor(() => expect(shell).toHaveAttribute("data-path-motion", "static"));
    expect(firstNode.style.opacity).toBe("");
    expect(firstNode.style.transform).toBe("");
    expect(firstNode).toHaveAttribute("data-path-node-progress", "1.000");
    expect(railLine.style.transform).toBe("");
    expect(firstNode).toHaveAttribute("data-motion-reduced", "true");
  });
});
