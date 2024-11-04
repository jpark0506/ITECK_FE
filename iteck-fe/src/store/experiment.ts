import { create } from "zustand";
import { ExperimentFile, UniqueFactor } from "../types/experiment";

interface Factor {
  name: string; // 고유 인자 이름 (예: 활물질, 바인더)
  type: string;
  amount: number;
}

interface Electrode {
  area: string;
  loading: string;
  rollingRate: string;
}

interface ExperimentStore {
  experiments: ExperimentFile[];
  updateExperiment: (index: number, experiment: Partial<ExperimentFile>) => void;
  initExperiments: () => void;
  uploadedFiles: File[];
  addFiles: (files: File[]) => void;
  deleteFile: (index: number) => void;
  updateFactor: (fileIndex: number, factorIndex: number, factor: Partial<Factor>) => void;
  electrode: Electrode;
  updateElectrode: (electrode: Partial<Electrode>) => void;
}

export const useExperimentStore = create<ExperimentStore>((set, get) => ({
  experiments: [],
  updateExperiment: (index, experiment) => {
    set((state) => ({
      experiments: state.experiments.map((exp, i) =>
        i === index ? { ...exp, ...experiment } : exp
      ),
    }));
  },
  initExperiments: () => {
    set({ experiments: [] });
  },
  uploadedFiles: [],
  addFiles: (files: File[]) => {
    set((state) => ({
      experiments: [
        ...state.experiments,
        ...files.map((file) => ({
          name: file.name,
          file: file,
          factor: [
            { name: "활물질", type: "", amount: 0 },
            { name: "바인더", type: "", amount: 0 },
            { name: "도전체", type: "", amount: 0 },
            { name: "전해질", type: "", amount: 0 },
          ],
        })),
      ],
    }));
  },
  deleteFile: (index: number) => {
    set((state) => ({
      experiments: state.experiments.filter((_, i) => i !== index),
    }));
  },
  updateFactor: (fileIndex, factorIndex, factor) => {
    set((state) => ({
      experiments: state.experiments.map((exp, i) =>
        i === fileIndex
          ? {
              ...exp,
              factor: exp.factor.map((f, j) =>
                j === factorIndex ? { ...f, ...factor } : f
              ),
            }
          : exp
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
