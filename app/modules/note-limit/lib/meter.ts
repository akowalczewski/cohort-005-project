import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteLimitLevel = "plenty" | "near" | "full";

export type NoteLimitMeter = {
  length: number;
  max: number;
  remaining: number;
  /** Share of the limit used, 0–100, for the width of the meter bar. */
  percentUsed: number;
  level: NoteLimitLevel;
};

// The warning starts with a tenth of the limit left: early enough to finish a
// thought, late enough not to nag through an ordinary Note.
const NEAR_FRACTION = 0.9;

export function measure(body: string, max = MAX_NOTE_LENGTH): NoteLimitMeter {
  const length = body.length;
  const remaining = Math.max(0, max - length);
  const percentUsed = Math.min(100, Math.round((length / max) * 100));
  const level: NoteLimitLevel =
    length >= max ? "full" : length >= max * NEAR_FRACTION ? "near" : "plenty";
  return { length, max, remaining, percentUsed, level };
}
