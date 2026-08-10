import { describe, expect, test } from "vitest";
import { siteConfig } from "./site-config";

describe("site configuration", () => {
  test("uses safe local defaults and exposes the public contract", () => {
    expect(siteConfig.portfolioUrl).toBe("http://localhost:3000");
    expect(siteConfig.blogUrl).toBe("http://localhost:3001");
    expect(siteConfig.email).toContain("@example.invalid");
    expect(siteConfig.linkedinUrl).toMatch(/^https:\/\//);
    expect(siteConfig.cvHref).toBe("/documents/mahadi-indra-cv.pdf");
  });
});
