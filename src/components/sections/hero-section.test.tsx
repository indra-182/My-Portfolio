import type { ComponentProps, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HeroSection } from "./hero-section";

const mockedNextLink = vi.hoisted(() => vi.fn());
const mockedImage = vi.hoisted(() => vi.fn());

vi.mock("next/link", () => ({
  default: ({ children, ...props }: ComponentProps<"a"> & { children?: ReactNode }) => {
    mockedNextLink(props);
    return (
      <a data-next-link="true" {...props}>
        {children}
      </a>
    );
  },
}));

vi.mock("next/image", () => ({
  default: (
    props: ComponentProps<"img"> & {
      fill?: boolean;
      loading?: "eager" | "lazy";
      preload?: boolean;
      priority?: boolean;
      unoptimized?: boolean;
    },
  ) => {
    mockedImage(props);
    const {
      fill: _fill,
      loading: _loading,
      preload: _preload,
      priority: _priority,
      unoptimized: _unoptimized,
      ...imageProps
    } = props;
    void _fill;
    void _loading;
    void _preload;
    void _priority;
    void _unoptimized;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt ?? ""} {...imageProps} />;
  },
}));

const profile = {
  name: "Mahadi Indra Manurung",
  role: "Senior Frontend Engineer",
  location: "Bogor, Indonesia",
  headline: "Building product interfaces that are clear and resilient.",
  valueProposition: "I turn complex workflows into understandable frontend experiences.",
  imageSrc: "/images/mahadi-indra.webp",
  imageAlt: "Mahadi Indra Manurung, Senior Frontend Engineer",
};

describe("HeroSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("uses a native anchor for the downloadable CV asset", () => {
    render(
      <HeroSection
        profile={profile}
        downloadLabel="Download CV"
        cvHref="/documents/mahadi-indra-cv.pdf"
        writingLabel="Latest writing"
      />,
    );

    const downloadLink = screen.getByRole("link", { name: /download cv/i });

    expect(downloadLink).toHaveAttribute("href", "/documents/mahadi-indra-cv.pdf");
    expect(downloadLink).toHaveAttribute("download", "");
    expect(downloadLink).not.toHaveAttribute("data-next-link");
    expect(mockedNextLink).not.toHaveBeenCalledWith(
      expect.objectContaining({ href: "/documents/mahadi-indra-cv.pdf" }),
    );
  });

  test("defers the below-the-fold mobile hero image", () => {
    render(
      <HeroSection
        profile={profile}
        downloadLabel="Download CV"
        cvHref="/documents/mahadi-indra-cv.pdf"
        writingLabel="Latest writing"
      />,
    );

    expect(screen.getByRole("img").closest("div.relative.mx-auto")).toHaveClass("mt-8");
    expect(mockedImage).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: "lazy",
        sizes: "22rem",
        unoptimized: true,
      }),
    );
  });
});
