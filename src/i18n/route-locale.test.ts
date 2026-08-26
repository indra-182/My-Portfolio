import { describe, expect, test } from "vitest";
import { getRecoveryLocale } from "./config";
import { requireLocale } from "./route-locale";

describe("locale route policy", () => {
  test("accepts only registered route locales", () => {
    expect(requireLocale("id")).toBe("id");
    expect(requireLocale("en")).toBe("en");
    expect(() => requireLocale("fr")).toThrow();
  });

  test("uses the default locale only for recovery UI", () => {
    expect(getRecoveryLocale("en")).toBe("en");
    expect(getRecoveryLocale("fr")).toBe("id");
    expect(getRecoveryLocale(undefined)).toBe("id");
  });
});
