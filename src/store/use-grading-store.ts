import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CriterionDraft {
  assignedPoints: number;
  feedback: string;
}

interface GradingState {
  // Keyed by submissionId -> criterionId -> draft values
  drafts: Record<string, Record<string, CriterionDraft>>;
  setCriterionScore: (
    submissionId: string,
    criterionId: string,
    points: number,
    feedback?: string
  ) => void;
  clearDraft: (submissionId: string) => void;
}

export const useGradingStore = create<GradingState>()(
  persist(
    (set) => ({
      drafts: {},
      setCriterionScore: (submissionId, criterionId, points, feedback = "") =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [submissionId]: {
              ...(state.drafts[submissionId] || {}),
              [criterionId]: { assignedPoints: points, feedback },
            },
          },
        })),
      clearDraft: (submissionId) =>
        set((state) => {
          const newDrafts = { ...state.drafts };
          delete newDrafts[submissionId];
          return { drafts: newDrafts };
        }),
    }),
    {
      name: "teacher-grading-drafts",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
