import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Zustand store
interface ExperimentState {
  experiments: Record<string, { id: string; result: any }>;
  setExperimentResult: (experimentId: string, result: any) => void;
  clear: () => void;
}

export const useResultStore = create<ExperimentState>()(
  (set) => ({
    experiments: {},
    setExperimentResult: (experimentId, result) =>
      set((state) => ({
        experiments: {
          ...state.experiments,
          [experimentId]: { id: experimentId, result },
        },
      })),
    clear: () => set({ experiments: {} }),
  })
);