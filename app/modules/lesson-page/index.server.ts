/**
 * The Lesson page: what it shows, and the writes its actions make beyond
 * comments, Bookmarks and Notes (which have their own homes in app/lib).
 */
export { loadLessonPage, type LessonPageInput } from "./lib/load.server";
export { markLessonComplete } from "./lib/progress.server";
export { getCommentById } from "./lib/thread.server";
export { computeResult, getQuizById } from "./lib/quiz.server";
