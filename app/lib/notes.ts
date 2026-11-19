export const MAX_NOTE_LENGTH = 2000;

/**
 * A browser submits each textarea line break as CRLF, but its counter and
 * `maxLength` count one character per line break. Normalise before measuring,
 * so a Note the box said fits is not refused for its line breaks.
 */
export function normalizeLineBreaks(body: string): string {
  return body.replace(/\r\n/g, "\n");
}
