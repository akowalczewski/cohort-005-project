import type { loadLessonPage } from "./lib/load.server";

/** What the Lesson page loader hands the page, in either of its two views. */
export type LessonPage = NonNullable<
  Awaited<ReturnType<typeof loadLessonPage>>
>;
export type FullLessonPage = Extract<LessonPage, { view: "full" }>;
export type LockedLessonPage = Extract<LessonPage, { view: "locked" }>;
