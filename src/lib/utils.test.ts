import { it, expect, describe } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("keeps the last conflicting padding class", () => {
    const result = cn("p-4", "p-8", "p-2");
    expect(result).toBe("p-2");
  });

  it("keeps the last conflicting border-radius class", () => {
    const result = cn("rounded", "rounded-lg");
    expect(result).toBe("rounded-lg");
  });

  it("ignores undefined and false values", () => {
    const result = cn("text-red-500", undefined, false, "hidden");
    expect(result).toBe("text-red-500 hidden");
  });
});
