import { create } from "zustand";
import { Experiment } from "../types/experiment";
interface ExperimentStore {
  experiment: Experiment;
  updateExperiment: (experiment: Partial<Experiment>) => void;
  getExperiment: () => Partial<Experiment>;
  initExperiment: () => void;
}

export const useExperimentStore = create<ExperimentStore>((set, get) => ({
  experiment: {
    title: "",
    executed_at: new Date(),
    memo: "",
    files: [],
    unique_factors: [],
  },
  updateExperiment: (experiment: Partial<Experiment>) => {
    set({ experiment: { ...get().experiment, ...experiment } });
  },
  getExperiment: () => get().experiment,
  initExperiment: () => {
    set({
      experiment: {
        title: "",
        executed_at: new Date(),
        memo: "",
        files: [],
        unique_factors: [],
      },
    });
  },
}));
