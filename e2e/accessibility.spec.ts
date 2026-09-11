import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["id", "en"]) {
  test(`${locale} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? "")),
    ).toEqual([]);
  });
}

test("skip link moves keyboard focus to the main landmark", async ({ page }) => {
  await page.goto("/id");
  await page.keyboard.press("Tab");
  await expect(page.locator('a[href="#main-content"]')).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

for (const [locale, themeLabel] of [
  ["id", "Ganti tema warna"],
  ["en", "Toggle color theme"],
] as const) {
  test(`${locale} keeps hero text readable after switching to light theme`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto(`/${locale}`);
    await page.getByRole("button", { name: themeLabel }).click();
    await expect(page.locator("html")).toHaveClass(/light/);

    const contrastRatios = await page
      .locator("#hero-title, .atlas-hero-copy > p, .atlas-stage-label")
      .evaluateAll((elements) => {
        const parseRgb = (value: string) => {
          const channels = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (channels) return channels.slice(1).map(Number);

          const srgbChannels = value.match(
            /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/[^)]*)?\)/,
          );
          if (srgbChannels) return srgbChannels.slice(1).map((channel) => Number(channel) * 255);

          throw new Error(`Unable to parse color: ${value}`);
        };
        const luminance = (channels: number[]) => {
          const [red, green, blue] = channels.map((channel) => {
            const normalized = channel / 255;
            return normalized <= 0.04045
              ? normalized / 12.92
              : ((normalized + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        };
        const heroBackground = luminance([7, 22, 29]);

        return elements.map((element) => {
          const color = getComputedStyle(element).color;
          const foreground = luminance(parseRgb(color));
          const ratio =
            (Math.max(foreground, heroBackground) + 0.05) /
            (Math.min(foreground, heroBackground) + 0.05);
          return { selector: element.id || element.className, color, ratio };
        });
      });

    expect(contrastRatios).not.toEqual([]);
    for (const measurement of contrastRatios) {
      expect(measurement.ratio, JSON.stringify(measurement)).toBeGreaterThanOrEqual(4.5);
    }
  });
}
