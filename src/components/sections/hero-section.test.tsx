import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HeroSection } from "./hero-section";

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
  test("uses a native anchor for the downloadable CV asset", () => {
    render(
      <HeroSection
        profile={profile}
        eyebrow="Senior Frontend Engineer · Indonesia"
        downloadLabel="Download CV"
        cvHref="/documents/mahadi-indra-cv.pdf"
        writingLabel="Latest writing"
      />,
    );

    const downloadLink = screen.getByRole("link", { name: /download cv/i });

    expect(downloadLink).toHaveAttribute("href", "/documents/mahadi-indra-cv.pdf");
    expect(downloadLink).toHaveAttribute("download", "");
    expect(downloadLink).not.toHaveAttribute("data-next-link");
  });

  test("loads the portrait eagerly for first-viewport visibility", () => {
    render(
      <HeroSection
        profile={profile}
        eyebrow="Senior Frontend Engineer · Indonesia"
        downloadLabel="Download CV"
        cvHref="/documents/mahadi-indra-cv.pdf"
        writingLabel="Latest writing"
      />,
    );

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("width", "380");
    expect(image).toHaveAttribute("height", "480");
  });
});
