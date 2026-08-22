import enMessages from "./messages/en.json";
import idMessages from "./messages/id.json";
import { describe, expect, test } from "vitest";

function leafPaths(value: unknown, path: string[] = []): string[] {
  if (typeof value !== "object" || value === null) return [path.join(".")];

  return Object.entries(value).flatMap(([key, child]) => leafPaths(child, [...path, key]));
}

function placeholders(value: unknown, path: string[] = []): Record<string, string[]> {
  if (typeof value === "string") {
    return {
      [path.join(".")]: [...value.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]).sort(),
    };
  }

  if (typeof value !== "object" || value === null) return {};

  return Object.entries(value).reduce<Record<string, string[]>>(
    (result, [key, child]) => ({ ...result, ...placeholders(child, [...path, key]) }),
    {},
  );
}

describe("locale message catalogs", () => {
  test("keep keys and interpolation placeholders in parity", () => {
    expect(leafPaths(idMessages)).toEqual(leafPaths(enMessages));
    expect(placeholders(idMessages)).toEqual(placeholders(enMessages));
  });
});
