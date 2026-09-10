import { expect, test } from "@playwright/test";

const expectedEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mahadiindra2@gmail.com";

test("supports recruiter content, navigation, theme, and locale", async ({ page }, testInfo) => {
  await page.goto("/id");
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.locator("#projects")).toHaveCount(1);
  await expect(page.locator("#experiences")).toHaveCount(1);

  if (testInfo.project.name === "chromium") {
    const navigation = page.getByRole("navigation", { name: "Navigasi utama", exact: true });
    await expect(navigation).toBeVisible();
    await expect(navigation.getByRole("link", { name: "Proyek", exact: true })).toHaveAttribute(
      "href",
      "/id#projects",
    );
    await expect(
      navigation.getByRole("link", { name: "Kapabilitas", exact: true }),
    ).toHaveAttribute("href", "/id#capabilities");
    await expect(navigation.getByRole("link", { name: "Testimoni", exact: true })).toHaveAttribute(
      "href",
      "/id#testimonials",
    );
    await expect(navigation.getByRole("link", { name: "Tulisan", exact: true })).toHaveAttribute(
      "href",
      "/id#writing",
    );
  }

  await expect(
    page.getByRole("heading", { name: "Proyek yang memetakan alur produk kompleks." }),
  ).toBeVisible();
  await expect(page.getByText("Petron Philippines Corporate Dashboard")).toBeVisible();
  await expect(page.locator(".atlas-path-node")).toHaveCount(4);
  await expect(
    page.locator(".atlas-hero").getByRole("link", { name: /kirim email/i }),
  ).toHaveAttribute("href", `mailto:${expectedEmail}`);
  await expect(page.getByRole("contentinfo").getByRole("link", { name: /email/i })).toHaveAttribute(
    "href",
    `mailto:${expectedEmail}`,
  );

  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-site-interaction="scroll-to-top"]')).toBeVisible();
  await page.getByText("Maybank Unit Trust", { exact: true }).click();
  await expect(
    page.getByText(
      "Perubahan pada alur utama dapat diverifikasi dengan lebih terstruktur sebelum dirilis.",
    ),
  ).toBeVisible();

  const themeToggle = page.getByRole("button", { name: "Ganti tema warna" });
  const initialTheme = await page.locator("html").getAttribute("class");
  const nextTheme = initialTheme?.includes("dark") ? "light" : "dark";
  await themeToggle.click();
  await expect(page.locator("html")).toHaveClass(new RegExp(nextTheme));
  await expect(themeToggle).toHaveAttribute("aria-pressed", String(nextTheme === "light"));
  await page.reload();
  await expect(page.locator("html")).toHaveClass(new RegExp(nextTheme));

  await page
    .getByRole("banner")
    .getByRole("link", { name: /ganti bahasa ke english/i })
    .click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: /I design frontend systems/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Projects that map complex product flows." }),
  ).toBeVisible();
});

test("does not expose the internal visual direction in rendered UI or metadata", async ({
  page,
}) => {
  for (const locale of ["/id", "/en"]) {
    await page.goto(locale);
    await expect(page.locator("body")).not.toContainText(/decision atlas/i);
    await expect(page.locator("head")).not.toContainText(/decision atlas/i);
    await expect(page.locator('meta[ name="description" ]')).not.toHaveAttribute(
      "content",
      /decision atlas/i,
    );
    await expect(page).not.toHaveTitle(/decision atlas/i);
  }
});

test("keeps extended font coverage off the initial rendering path", async ({ page }) => {
  const fontRequests: string[] = [];
  page.on("requestfinished", (request) => {
    if (request.resourceType() === "font") {
      fontRequests.push(new URL(request.url()).pathname);
    }
  });

  await page.goto("/id");
  await page.evaluate(() => document.fonts.ready);
  expect(fontRequests).toEqual(["/fonts/Recursive-Variable.woff2"]);

  const fontFamily = await page.evaluate(async () => {
    const extendedCharacter = document.createElement("span");
    extendedCharacter.textContent = "Ā";
    document.body.append(extendedCharacter);
    const family = getComputedStyle(extendedCharacter).fontFamily;
    extendedCharacter.getBoundingClientRect();
    await document.fonts.ready;
    return family;
  });

  expect(fontFamily).toContain("Recursive Extended");
  await expect.poll(() => fontRequests).toContain("/fonts/Recursive-Variable-extended.woff2");
});

test("follows the system theme on first visit", async ({ browser }) => {
  for (const [colorScheme, expectedClass] of [
    ["light", "light"],
    ["dark", "dark"],
  ] as const) {
    const context = await browser.newContext({ colorScheme });
    const page = await context.newPage();
    await page.goto("/id");
    await expect(page.locator("html")).toHaveClass(new RegExp(expectedClass));
    await context.close();
  }
});

test("renders the final project-path state with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/id");

  const pathNode = page.locator(".atlas-path-node").first();
  await expect(pathNode).toBeVisible();
  await expect(pathNode).toHaveAttribute("data-motion-reduced", "true");
  await expect
    .poll(() => pathNode.evaluate((element) => getComputedStyle(element).transform))
    .toBe("none");
  await expect
    .poll(() =>
      page.locator(".atlas-hero-route").evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("none");
  await expect
    .poll(() =>
      page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior),
    )
    .toBe("auto");
});

test("preserves hero perspective while pointer parallax is active", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/id");

  const route = page.locator(".atlas-hero-route");
  const parallaxLayer = page.locator(".atlas-hero-route-motion");
  await expect(route).toBeVisible();
  await expect
    .poll(() => route.evaluate((element) => getComputedStyle(element).transform))
    .toMatch(/^matrix3d\(/);

  await page.mouse.move(640, 360);
  const centeredTransform = await parallaxLayer.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.mouse.move(100, 100);
  await expect
    .poll(() => parallaxLayer.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(centeredTransform);
});

test("switches the featured path between desktop rail and inline sequence", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/id");
  const pathShell = page.locator(".atlas-path-shell");
  const pathRail = page.locator(".atlas-path-rail");

  await expect(pathShell).toHaveAttribute("data-path-mode", "responsive");
  await expect(pathRail).toHaveCSS("position", "sticky");
  await expect(page.locator(".atlas-path-node")).toHaveCount(4);

  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(pathRail).toHaveCSS("display", "none");
  await expect(page.locator(".atlas-path-node")).toHaveCount(4);
});

test("advances the desktop Petron path with native scroll progress", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/id");

  const pathShell = page.locator(".atlas-path-shell");
  await expect(pathShell).toHaveAttribute("data-path-motion", "scroll");
  const initialProgress = Number(await pathShell.getAttribute("data-path-progress"));

  await page.locator("#featured-project").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 420));

  await expect
    .poll(async () => Number(await pathShell.getAttribute("data-path-progress")))
    .toBeGreaterThan(initialProgress);
  await expect
    .poll(async () =>
      Number(await page.locator(".atlas-path-node").last().getAttribute("data-path-node-progress")),
    )
    .toBeGreaterThan(0.4);
});

test("keeps the legacy experiences anchor addressable", async ({ page }) => {
  await page.goto("/id#experiences");
  await expect(page).toHaveURL(/\/id#experiences$/);
  await expect(page.locator("#experiences")).toBeAttached();
});

test("redirects the root route to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/id$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
});

test("opens and closes the native mobile navigation with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/id");

  const openMenu = page.getByRole("button", { name: /buka menu/i });
  await openMenu.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Proyek", exact: true })).toHaveAttribute(
    "href",
    "/id#projects",
  );
  await expect(dialog.getByRole("link", { name: "Testimoni", exact: true })).toHaveAttribute(
    "href",
    "/id#testimonials",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(openMenu).toBeFocused();
});

test("keeps all locales, themes, and review widths free of horizontal overflow", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Responsive matrix runs in Chromium only");
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
        await expect(page.locator("#projects")).toBeAttached();
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
          await page.evaluate(() => document.documentElement.clientWidth),
        );
      }
    }
  }
});

test("keeps the portrait in the desktop hero viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/id");
  const image = page.locator("main section img").first();
  await expect(image).toBeVisible();
  const imageBox = await image.boundingBox();
  expect(imageBox).not.toBeNull();
  expect(imageBox?.y).toBeGreaterThanOrEqual(0);
  expect((imageBox?.y ?? 0) + (imageBox?.height ?? 0)).toBeLessThanOrEqual(720);
});

test("renders branded recovery for unmatched routes", async ({ page }) => {
  await page.goto("/missing/nested-route");
  await expect(page.getByRole("heading", { name: "Halaman tidak ditemukan" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Kembali ke beranda" })).toHaveAttribute(
    "href",
    "/id",
  );
});

test("keeps the Indonesian light desktop scene stable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Snapshots are authored in Chromium");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/id");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        window.dispatchEvent(new Event("scroll"));
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  await page.mouse.move(0, 0);
  await page.addStyleTag({
    content:
      ".site-nav-link { border-color: transparent !important; color: var(--muted-foreground) !important; }",
  });
  await expect(page).toHaveScreenshot("portfolio-id-light-desktop.png", {
    animations: "disabled",
  });
});

test("keeps the English dark mobile scene stable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Snapshots are authored in Chromium");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        window.dispatchEvent(new Event("scroll"));
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  await page.mouse.move(0, 0);
  await page.addStyleTag({
    content:
      ".site-nav-link { border-color: transparent !important; color: var(--muted-foreground) !important; }",
  });
  await expect(page).toHaveScreenshot("portfolio-en-dark-mobile.png", {
    animations: "disabled",
  });
});
