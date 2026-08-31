import { expect, test } from "@playwright/test";

test("supports recruiter content, navigation, experience, theme, and locale journey", async ({
  page,
}, testInfo) => {
  const expectDesktopPrimaryNavigation = async (name: string) => {
    if (testInfo.project.name !== "chromium") return;
    await expect(page.getByRole("navigation", { name, exact: true })).toBeVisible();
  };
  const expectDesktopNavigationLink = async (name: string, label: string, href: string) => {
    if (testInfo.project.name !== "chromium") return;
    await expect(
      page
        .getByRole("navigation", { name, exact: true })
        .getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("href", href);
  };
  const expectedEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mahadiindra2@gmail.com";
  const expectContactCutover = async () => {
    await expect(page.locator("#contact")).toHaveCount(0);
    await expect(page.locator('a[href$="#contact"]')).toHaveCount(0);
    await expect(
      page.getByRole("contentinfo").getByRole("link", { name: /email/i }),
    ).toHaveAttribute("href", `mailto:${expectedEmail}`);
  };

  await page.goto("/id");
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expectDesktopPrimaryNavigation("Navigasi utama");
  await expectDesktopNavigationLink("Navigasi utama", "Pengalaman", "/id#experiences");
  await expectDesktopNavigationLink("Navigasi utama", "Konten", "/id#writing");
  if (testInfo.project.name === "chromium") {
    const primaryNavigation = page.getByRole("navigation", {
      name: "Navigasi utama",
      exact: true,
    });
    await expect(
      primaryNavigation.getByRole("link", { name: "Experiences", exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        name: "Pengalaman terpilih di alur produk kompleks.",
        exact: true,
      }),
    ).toBeVisible();
    await primaryNavigation.getByRole("link", { name: "Konten", exact: true }).click();
    await expect(page).toHaveURL(/\/id#writing$/);
    await expect(
      page.getByRole("heading", { name: "Catatan teknis untuk sistem frontend.", exact: true }),
    ).toBeVisible();
  }
  const expectRemovedCueChrome = async (workflowLabel: string) => {
    for (const index of ["01", "02", "03", "04", "05", "01 / 05"]) {
      await expect(page.locator("main#main-content").getByText(index, { exact: true })).toHaveCount(
        0,
      );
    }
    await expect(page.getByText(workflowLabel, { exact: true })).toHaveCount(0);
  };

  await expectRemovedCueChrome("Urutan workflow Petron");
  await page.evaluate(() => window.scrollTo(0, 0));
  const scrollToTop = page.locator('[data-site-interaction="scroll-to-top"]');
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
    const section = document.querySelector("#experiences");
    if (!(section instanceof HTMLElement)) throw new Error("Experiences section not found");
    window.scrollTo(0, section.offsetTop);
  });
  await expect(scrollToTop).toBeVisible();
  if (testInfo.project.name === "chromium") {
    await expect(
      page
        .getByRole("navigation", { name: "Navigasi utama", exact: true })
        .getByRole("link", { name: "Pengalaman", exact: true }),
    ).toHaveAttribute("aria-current", "location");
  }
  await page.evaluate(() => {
    const section = document.querySelector("#writing");
    if (!(section instanceof HTMLElement)) throw new Error("Writing section not found");
    window.scrollTo(0, section.offsetTop);
  });
  await expect(scrollToTop).toBeVisible();
  if (testInfo.project.name === "chromium") {
    await expect(
      page
        .getByRole("navigation", { name: "Navigasi utama", exact: true })
        .getByRole("link", { name: "Konten", exact: true }),
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
  await expectContactCutover();
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
  await expect(page.getByRole("button", { name: "Ganti tema warna" })).toHaveAttribute(
    "data-site-interaction",
    "theme-toggle",
  );
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
  await expectDesktopNavigationLink("Primary navigation", "Experiences", "/en#experiences");
  await expectDesktopNavigationLink("Primary navigation", "Content", "/en#writing");
  await expect(
    page.getByRole("heading", {
      name: "Selected experience across complex product flows.",
      exact: true,
    }),
  ).toBeVisible();
  await expectContactCutover();
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

test("keeps workflow evidence legible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/id");

  const cueSegment = page.locator(".workflow-cue-line span").first();
  await expect(cueSegment).toBeVisible();
  await expect
    .poll(() =>
      cueSegment.evaluate((element) => {
        const style = getComputedStyle(element);
        return { animationName: style.animationName, transform: style.transform };
      }),
    )
    .toEqual({ animationName: "none", transform: "none" });
  await expect
    .poll(() =>
      page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior),
    )
    .toBe("auto");
});

test("redirects the root route to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/id$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
});

test("opens and closes the mobile navigation with keyboard escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/id");
  const openMenu = page.getByRole("button", { name: /buka menu/i });
  await expect(openMenu).toHaveAttribute("data-site-interaction", "mobile-navigation-open");
  await openMenu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator('[data-site-interaction="mobile-navigation"]')).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("button", { name: /tutup menu/i }),
  ).toHaveAttribute("data-site-interaction", "mobile-navigation-close");
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("link", { name: "Pengalaman", exact: true })).toHaveAttribute(
    "href",
    "/id#experiences",
  );
  await expect(dialog.getByRole("link", { name: "Konten", exact: true })).toHaveAttribute(
    "href",
    "/id#writing",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(openMenu).toBeFocused();
});

test("keeps localized theme layouts responsive without overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Responsive matrix runs in Chromium only");
  const headings = {
    id: /Saya merancang frontend/i,
    en: /I design frontend systems/i,
  };
  const viewports = [
    { width: 375, height: 812 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ];

  for (const locale of ["id", "en"] as const) {
    for (const theme of ["dark", "light"] as const) {
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.goto(`/${locale}`);
        await page.evaluate((value) => localStorage.setItem("theme", value), theme);
        await page.reload();

        await expect(page.getByRole("heading", { name: headings[locale] })).toBeVisible();
        await expect(page.locator('a[href$="#experiences"]')).toHaveCount(2);
        await expect(page.locator('a[href$="#writing"]')).toHaveCount(2);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
          await page.evaluate(() => document.documentElement.clientWidth),
        );
      }
    }
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
