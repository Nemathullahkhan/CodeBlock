import { markContentAsCompleted } from "@/lib/actions/ideActions";
import { create } from "zustand";

interface ContentProgressState {
  contentProgress: Record<string, boolean>;
  setContentProgress: (contentId: string, isCompleted: boolean) => void;
  markContentAsCompleted: (contentId: string, userId: string) => Promise<void>;
}

interface MarkContentResult {
  success: boolean;
  error?: string;
}

export const useContentProgressStore = create<ContentProgressState>((set, get) => ({
  contentProgress: {},

  setContentProgress: (contentId, isCompleted) => {
    set((state) => ({
      contentProgress: {
        ...state.contentProgress,
        [contentId]: isCompleted,
      },
    }));
  },

  markContentAsCompleted: async (contentId, userId) => {
    const { contentProgress, setContentProgress } = get();
    if (!contentProgress[contentId]) {
      const result: MarkContentResult = await markContentAsCompleted({ userId, contentId });

      if (result.success) {
        setContentProgress(contentId, true);
      } else {
        console.error(result.error);
      }
    }
  },
}));
