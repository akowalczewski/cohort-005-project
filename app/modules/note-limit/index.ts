import { measure, type NoteLimitMeter } from "./lib/meter";

export type { NoteLimitLevel, NoteLimitMeter } from "./lib/meter";

/**
 * How close a Note body is to the Note length limit: what the Note box shows
 * so the Student sees the limit coming before typing stops.
 */
export function noteLimitMeter(body: string): NoteLimitMeter {
  return measure(body);
}
