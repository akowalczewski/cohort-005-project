import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn, formatRelativeTime } from "~/lib/utils";
import {
  noteLimitMeter,
  type NoteLimitLevel,
  type NoteLimitMeter,
} from "~/modules/note-limit";

export type LessonNoteData = { body: string; updatedAt: string } | null;

const counterTone: Record<NoteLimitLevel, string> = {
  plenty: "text-muted-foreground",
  near: "text-amber-600 dark:text-amber-500",
  full: "text-destructive",
};

const barTone: Record<NoteLimitLevel, string> = {
  plenty: "bg-primary/60",
  near: "bg-amber-500",
  full: "bg-destructive",
};

function NoteLimitBar({ meter }: { meter: NoteLimitMeter }) {
  return (
    <div
      className="h-1 w-full overflow-hidden rounded-full bg-muted"
      aria-hidden="true"
    >
      <div
        className={cn("h-full transition-all", barTone[meter.level])}
        style={{ width: `${meter.percentUsed}%` }}
      />
    </div>
  );
}

function limitPrefix(meter: NoteLimitMeter): string {
  if (meter.level === "full") return "Limit reached · ";
  if (meter.level === "near")
    return `${meter.remaining.toLocaleString("en")} left · `;
  return "";
}

function NoteLimitCounter({ meter }: { meter: NoteLimitMeter }) {
  return (
    <span
      id="note-limit"
      aria-live="polite"
      className={cn("ml-auto text-xs", counterTone[meter.level])}
    >
      {limitPrefix(meter)}
      {meter.length.toLocaleString("en")} / {meter.max.toLocaleString("en")}
    </span>
  );
}

export function LessonNote({ note }: { note: LessonNoteData }) {
  const fetcher = useFetcher<{ ok: boolean; error?: string }>();
  const [body, setBody] = useState(note?.body ?? "");
  const saving = fetcher.state !== "idle";
  const meter = noteLimitMeter(body);
  const empty = body.trim().length === 0;

  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data) return;
    if (fetcher.data.error) toast.error(fetcher.data.error);
    else if (fetcher.data.ok) toast.success("Note saved");
  }, [fetcher.state, fetcher.data]);

  return (
    <fetcher.Form method="post" className="space-y-2">
      <input type="hidden" name="intent" value="save-note" />
      <Textarea
        name="body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        maxLength={meter.max}
        rows={4}
        placeholder="Write a note for this lesson..."
        aria-label="Your notes"
        aria-describedby="note-limit"
      />

      <NoteLimitBar meter={meter} />

      <div className="flex items-center gap-3">
        <Button type="submit" size="sm" disabled={saving || empty}>
          {saving ? "Saving..." : "Save note"}
        </Button>

        {note && (
          <span
            suppressHydrationWarning
            className="text-xs text-muted-foreground"
          >
            Last edited {formatRelativeTime(note.updatedAt)}
          </span>
        )}

        <NoteLimitCounter meter={meter} />
      </div>

      <p className="text-xs text-muted-foreground">
        Only you can read your notes.
      </p>
    </fetcher.Form>
  );
}
