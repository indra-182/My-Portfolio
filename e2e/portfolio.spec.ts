import { expect, test } from "@playwright/test";

test("supports the recruiter path, CV, locale, theme, and safe writing fallback", async ({ page }) => {
  await page.goto("/id");

  await expect(page.getByRole("heading", { name: /Membangun antarmuka produk/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /What collaborators say/i })).toBeVisible();
  await expect(page.getByText("Frisko Mayufid")).toBeVisible();
  await expect(page.getByText("Wahyu Aziz")).toBeVisible();
  await expect(page.getByText("Rehan Zibran")).toBeVisible();
  await expect(page.getByText("Muhammad Abdurrafi")).toBeVisible();
  await expect(page.locator("main#main-content").getByRole("link", { name: /Unduh CV/i })).toHaveAttribute(
    "href",
    "/documents/mahadi-indra-cv.pdf",
  );
  await expect(page.getByRole("link", { name: /visit blog/i })).toHaveAttribute(
    "href",
    "http://localhost:3001/id",
  );

  await page.getByRole("button", { name: /switch to dark mode/i }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: /switch to light mode/i }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);

  await page.getByRole("banner").getByRole("link", { name: /switch language to english/i }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("heading", { name: /Building product interfaces/i })).toBeVisible();
});

test("uses the operating-system theme on first visit without a system menu item", async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/id");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: /switch to light mode/i })).toBeVisible();
  await context.close();
});

test("opens and closes the mobile navigation with keyboard escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile navigation is covered by the mobile project.");
  await page.goto("/id");
  await page.getByRole("button", { name: /open menu/i }).click();
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
