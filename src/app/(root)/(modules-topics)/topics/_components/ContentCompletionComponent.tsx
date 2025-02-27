import { useContentProgressStore } from "@/store/progressStore";
import { useSession } from "next-auth/react";

export default function ContentComponent({ contentId }: { contentId: string }) {
  const { data: session } = useSession();
  const { contentProgress, markContentAsCompleted } = useContentProgressStore();

  const isCompleted = contentProgress[contentId];

  const handleCompletion = async () => {
    if (session?.userId) {
      await markContentAsCompleted(contentId);
    } else {
      console.error("User is not authenticated");
    }
  };

  return (
    <div>
      {/* Render content details */}
      {isCompleted && <span>✅ Completed</span>}
      <button onClick={handleCompletion}>Mark as Completed</button>
    </div>
  );
}
