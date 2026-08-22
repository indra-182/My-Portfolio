import { describe, expect, test } from "vitest";
import { siteConfig } from "./site-config";

describe("site configuration", () => {
  test("uses safe defaults and exposes the public contract", () => {
    expect(siteConfig.portfolioUrl).toBe("https://portfolio-indradev.vercel.app");
    expect(siteConfig.blogUrl).toBe("https://blog-indra.vercel.app");
    expect(siteConfig.email).toBe("mahadiindra2@gmail.com");
    expect(siteConfig.linkedinUrl).toBe("https://www.linkedin.com/in/mahadiindra182");
    expect(siteConfig.githubUrl).toBe("https://github.com/indra-182");
    expect(siteConfig.cvHref).toBe("/documents/mahadi-indra-cv.pdf");
  });

  test("strips trailing slashes from URL defaults", () => {
    expect(siteConfig.portfolioUrl.endsWith("/")).toBe(false);
    expect(siteConfig.blogUrl.endsWith("/")).toBe(false);
  });
});
