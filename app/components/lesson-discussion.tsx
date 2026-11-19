import type { ReactNode } from "react";
import { MessageSquare, NotebookPen } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  CommentThread,
  type RenderedComment,
} from "~/components/comment-thread";
import { LessonNote, type LessonNoteData } from "~/components/lesson-note";

function DiscussionAndNoteTabs({
  thread,
  note,
}: {
  thread: ReactNode;
  note: LessonNoteData;
}) {
  return (
    <Tabs defaultValue="discussion" className="gap-4">
      <TabsList className="h-10">
        <TabsTrigger value="discussion" className="px-3 text-base">
          <MessageSquare />
          Questions &amp; Discussion
        </TabsTrigger>
        <TabsTrigger value="notes" className="px-3 text-base">
          <NotebookPen />
          Your notes
        </TabsTrigger>
      </TabsList>
      {/* Mounted while hidden, so a half-written Note survives a look at the discussion. */}
      <TabsContent
        value="discussion"
        forceMount
        className="data-[state=inactive]:hidden"
      >
        {thread}
      </TabsContent>
      <TabsContent
        value="notes"
        forceMount
        className="data-[state=inactive]:hidden"
      >
        <LessonNote note={note} />
      </TabsContent>
    </Tabs>
  );
}

/**
 * The card under the lesson: Questions & Discussion, and, for a signed-in
 * person, a tab with their Note beside it.
 */
export function LessonDiscussion({
  comments,
  currentUserId,
  canModerate,
  instructorName,
  note,
}: {
  comments: RenderedComment[];
  currentUserId: number | null;
  canModerate: boolean;
  instructorName: string;
  note: LessonNoteData;
}) {
  const thread = (
    <CommentThread
      comments={comments}
      currentUserId={currentUserId}
      canModerate={canModerate}
      canPost
      instructorName={instructorName}
    />
  );

  return (
    <Card className="mb-8 py-0">
      <CardContent className="p-6">
        {currentUserId ? (
          <DiscussionAndNoteTabs thread={thread} note={note} />
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="size-5 text-primary" />
              <h2 className="text-xl font-semibold">
                Questions &amp; Discussion
              </h2>
            </div>
            {thread}
          </>
        )}
      </CardContent>
    </Card>
  );
}
