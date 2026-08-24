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
  const props = {
    profile,
    emailLabel: "Email me",
    email: "mahadiindra2@gmail.com",
    downloadLabel: "Download CV",
    cvHref: "/documents/mahadi-indra-cv.pdf",
  };

  test("makes direct email the primary action and keeps the CV downloadable", () => {
    render(<HeroSection {...props} />);
    expect(screen.getByRole("heading", { name: profile.headline })).toBeVisible();
    const emailLink = screen.getByRole("link", { name: /email me/i });
    const downloadLink = screen.getByRole("link", { name: /download cv/i });

    expect(emailLink).toHaveAttribute("href", "mailto:mahadiindra2@gmail.com");
    expect(downloadLink).toHaveAttribute("href", "/documents/mahadi-indra-cv.pdf");
    expect(downloadLink).toHaveAttribute("download", "");
    expect(downloadLink).not.toHaveAttribute("data-next-link");
  });

  test("loads the portrait eagerly without rendering the removed workflow band", () => {
    render(<HeroSection {...props} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("width", "380");
    expect(image).toHaveAttribute("height", "480");
    expect(screen.getByText(profile.role.toUpperCase())).toBeVisible();
    expect(screen.queryByText(profile.name)).not.toBeInTheDocument();
    expect(screen.queryByText(/Petron workflow\s+sequence/i)).not.toBeInTheDocument();
  });
});
