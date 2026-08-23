import { expect, test } from "@playwright/test";

test("supports the recruiter path, CV, locale, theme, case study, and safe writing fallback", async ({
  page,
}, testInfo) => {
  const expectDesktopPrimaryNavigation = async (name: string) => {
    if (testInfo.project.name !== "chromium") return;
    await expect(page.getByRole("navigation", { name, exact: true })).toBeVisible();
  };
  const expectDesktopProjects = async (name: string, href: string) => {
    if (testInfo.project.name !== "chromium") return;
    await expect(
      page
        .getByRole("navigation", { name, exact: true })
        .getByRole("link", { name: "PROJECTS", exact: true }),
    ).toHaveAttribute("href", href);
  };
  const expectedEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mahadiindra2@gmail.com";

  await page.goto("/id");
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expectDesktopPrimaryNavigation("Navigasi utama");
  await expectDesktopProjects("Navigasi utama", "/id#case-studies");
  const expectRemovedCueChrome = async (workflowLabel: string) => {
    for (const index of ["01", "02", "03", "04", "05", "01 / 05"]) {
      await expect(page.locator("main#main-content").getByText(index, { exact: true })).toHaveCount(
        0,
      );
    }
    await expect(page.getByText(workflowLabel, { exact: true })).toHaveCount(0);
  };

  await expectRemovedCueChrome("Urutan workflow Petron");
  const scrollToTop = page.getByRole("button", { name: /kembali ke atas/i });
  await expect(scrollToTop).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, 240));
  await expect(scrollToTop).toBeHidden();
  await page.evaluate(() => {
    const section = document.querySelector("#capabilities");
    if (!(section instanceof HTMLElement)) throw new Error("Capabilities section not found");
    window.scrollTo(0, section.offsetTop);
  });
  await expect(scrollToTop).toBeVisible();
  if (testInfo.project.name === "chromium") {
    await expect(
      page
        .getByRole("navigation", { name: "Navigasi utama", exact: true })
        .getByRole("link", { name: "Kapabilitas", exact: true }),
    ).toHaveAttribute("aria-current", "location");
  }
  await page.evaluate(() => {
    const section = document.querySelector("#case-studies");
    if (!(section instanceof HTMLElement)) throw new Error("Case studies section not found");
    window.scrollTo(0, section.offsetTop);
  });
  await expect(scrollToTop).toBeVisible();
  if (testInfo.project.name === "chromium") {
    await expect(
      page
        .getByRole("navigation", { name: "Navigasi utama", exact: true })
        .getByRole("link", { name: "PROJECTS", exact: true }),
    ).toHaveAttribute("aria-current", "location");
  }
  await scrollToTop.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(10);
  await expect(scrollToTop).toBeHidden();

  await expect(page.getByRole("heading", { name: /Saya merancang frontend/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Bukti dari orang/i })).toBeVisible();
  await expect(page.getByText("Petron Philippines Corporate Dashboard")).toBeVisible();
  await expect(page.getByText("Frisko Mayufid")).toBeVisible();
  await expect(page.getByText("Wahyu Aziz")).toBeVisible();
  await expect(page.getByText("Rehan Zibran")).toBeVisible();
  await expect(page.getByText("Muhammad Abdurrafi")).toBeVisible();
  await expect(
    page.locator(".cue-hero").getByRole("link", { name: /kirim email/i }),
  ).toHaveAttribute("href", `mailto:${expectedEmail}`);
  await expect(
    page
      .locator("main#main-content")
      .getByRole("link", { name: /Unduh CV/i })
      .first(),
  ).toHaveAttribute("href", "/documents/mahadi-indra-cv.pdf");
  await expect(page.getByRole("link", { name: /kunjungi blog/i })).toHaveAttribute(
    "href",
    "https://blog-indra.vercel.app",
  );

  await page.getByText("Maybank Unit Trust").click();
  await expect(
    page.getByText(
      "Perubahan pada alur utama dapat diverifikasi dengan lebih terstruktur sebelum dirilis.",
    ),
  ).toBeVisible();

  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Ganti tema warna" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.getByRole("button", { name: "Ganti tema warna" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page
    .getByRole("banner")
    .getByRole("link", { name: /ganti bahasa ke english/i })
    .click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: /I design frontend systems/i })).toBeVisible();
  await expectDesktopPrimaryNavigation("Primary navigation");
  await expectDesktopProjects("Primary navigation", "/en#case-studies");
  await expectRemovedCueChrome("Petron workflow sequence");
});

test("defaults to dark theme on first visit", async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: "light" });
  const page = await context.newPage();
  await page.goto("/id");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: "Ganti tema warna" })).toBeVisible();
  await context.close();
});

test("redirects the root route to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/id$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
});

test("opens and closes the mobile navigation with keyboard escape", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "Mobile navigation is covered by the mobile project.",
  );
  await page.goto("/id");
  await page.getByRole("button", { name: /buka menu/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Kapabilitas" })).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("link", { name: "PROJECTS", exact: true }),
  ).toHaveAttribute("href", "/id#case-studies");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("does not overflow at supported viewport widths", async ({ page }) => {
  await page.goto("/id");
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(page.getByRole("heading", { name: /Saya merancang frontend/i })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => document.documentElement.clientWidth),
    );
  }
});

test("keeps the hero photo visible in the initial desktop viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/id");

  const image = page.locator("main section img").first();
  await expect(image).toBeVisible();
  const imageBox = await image.boundingBox();

  expect(imageBox).not.toBeNull();
  expect(imageBox?.y).toBeGreaterThanOrEqual(0);
  expect((imageBox?.y ?? 0) + (imageBox?.height ?? 0)).toBeLessThanOrEqual(720);
});
