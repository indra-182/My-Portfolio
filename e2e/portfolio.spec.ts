import { expect, test } from "@playwright/test";

test("supports the recruiter path, CV, locale, theme, and safe writing fallback", async ({
  page,
}, testInfo) => {
  const expectDesktopPrimaryNavigation = async (name: string) => {
    if (testInfo.project.name !== "chromium") return;
    await expect(page.getByRole("navigation", { name, exact: true })).toBeVisible();
  };

  await page.goto("/id");
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expectDesktopPrimaryNavigation("Navigasi utama");

  await expect(page.getByRole("heading", { name: /Membangun antarmuka produk/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Apa kata kolaborator/i })).toBeVisible();
  await expect(page.getByText("Frisko Mayufid")).toBeVisible();
  await expect(page.getByText("Wahyu Aziz")).toBeVisible();
  await expect(page.getByText("Rehan Zibran")).toBeVisible();
  await expect(page.getByText("Muhammad Abdurrafi")).toBeVisible();
  await expect(
    page.locator("main#main-content").getByRole("link", { name: /Unduh CV/i }),
  ).toHaveAttribute("href", "/documents/mahadi-indra-cv.pdf");
  await expect(page.getByRole("link", { name: /kunjungi blog/i })).toHaveAttribute(
    "href",
    "https://blog-indra.vercel.app",
  );

  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Ganti tema warna" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
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
  await expect(page.getByRole("heading", { name: /Building product interfaces/i })).toBeVisible();
  await expectDesktopPrimaryNavigation("Primary navigation");
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
  await expect(page.getByRole("dialog").getByRole("link", { name: "Tentang" })).toBeVisible();
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
    await expect(page.getByRole("heading", { name: /Membangun antarmuka produk/i })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => document.documentElement.clientWidth),
    );
  }
});

test("keeps the hero photo fully visible on the initial desktop viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/id");

  const image = page.locator("main section img").first();
  await expect(image).toBeVisible();
  const imageBox = await image.boundingBox();
  const headingBox = await page.locator("main section h1").boundingBox();

  expect(imageBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(Math.abs((imageBox?.y ?? 0) - (headingBox?.y ?? 0))).toBeLessThanOrEqual(2);
  expect(imageBox?.y).toBeGreaterThanOrEqual(0);
  expect((imageBox?.y ?? 0) + (imageBox?.height ?? 0)).toBeLessThanOrEqual(720);
});
