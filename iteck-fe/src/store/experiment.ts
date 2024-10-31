import { create } from "zustand";
import { Experiment } from "../types/experiment";

interface Factor {
  name: string; // 고유 인자 이름 (예: 활물질, 바인더)
  type: string;
  amount: string;
}

interface Electrode {
  area: string;
  loading: string;
  rollingRate: string;
}

interface ExperimentStore {
  experiment: Experiment;
  updateExperiment: (experiment: Partial<Experiment>) => void;
  getExperiment: () => Partial<Experiment>;
  initExperiment: () => void;
  uploadedFiles: File[];
  addFiles: (files: File[]) => void;
  deleteFile: (index: number) => void;
  uniqueFactors: Factor[];
  updateFactor: (index: number, factor: Partial<Factor>) => void;
  electrode: Electrode;
  updateElectrode: (electrode: Partial<Electrode>) => void;
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
      },
    });
  },
  uploadedFiles: [],
  addFiles: (files: File[]) => {
    set((state) => ({
      uploadedFiles: [...state.uploadedFiles, ...files],
    }));
  },
  deleteFile: (index: number) => {
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((_, i) => i !== index),
    }));
  },
  uniqueFactors: [
    { name: "활물질", type: "", amount: "" },
    { name: "바인더", type: "", amount: "" },
    { name: "도전체", type: "", amount: "" },
    { name: "전해질", type: "", amount: "" },
  ],
  updateFactor: (index, factor) => {
    set((state) => ({
      uniqueFactors: state.uniqueFactors.map((f, i) =>
        i === index ? { ...f, ...factor } : f
      ),
    }));
  },
  electrode: { area: "", loading: "", rollingRate: "" },
  updateElectrode: (electrode) => {
    set((state) => ({
      electrode: { ...state.electrode, ...electrode },
    }));
  },
}));
