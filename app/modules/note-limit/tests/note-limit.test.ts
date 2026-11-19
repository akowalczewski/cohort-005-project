import { describe, it, expect } from "vitest";
import { noteLimitMeter } from "../index";
import { MAX_NOTE_LENGTH } from "~/lib/notes";

describe("noteLimitMeter", () => {
  it("measures an empty Note against the 2,000-character limit", () => {
    expect(noteLimitMeter("")).toEqual({
      length: 0,
      max: 2000,
      remaining: 2000,
      percentUsed: 0,
      level: "plenty",
    });
  });

  it("uses the shared Note length limit", () => {
    expect(noteLimitMeter("").max).toBe(MAX_NOTE_LENGTH);
  });

  it("counts characters used and left", () => {
    const meter = noteLimitMeter("a".repeat(500));
    expect(meter.length).toBe(500);
    expect(meter.remaining).toBe(1500);
    expect(meter.percentUsed).toBe(25);
  });

  it("rounds the share used to a whole percent", () => {
    expect(noteLimitMeter("a".repeat(1011)).percentUsed).toBe(51);
  });

  it("stays plenty just short of the last tenth", () => {
    expect(noteLimitMeter("a".repeat(1799)).level).toBe("plenty");
  });

  it("is near once the last tenth starts", () => {
    expect(noteLimitMeter("a".repeat(1800)).level).toBe("near");
    expect(noteLimitMeter("a".repeat(1999)).level).toBe("near");
  });

  it("is full at the limit, with nothing left", () => {
    const meter = noteLimitMeter("a".repeat(2000));
    expect(meter.level).toBe("full");
    expect(meter.remaining).toBe(0);
    expect(meter.percentUsed).toBe(100);
  });

  it("never reports more than the limit, even if a body overshoots", () => {
    const meter = noteLimitMeter("a".repeat(2500));
    expect(meter.level).toBe("full");
    expect(meter.remaining).toBe(0);
    expect(meter.percentUsed).toBe(100);
  });
});
