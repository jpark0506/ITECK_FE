import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Factor = {
  name: string;
  isVariable: boolean;
  isFixed: boolean;
  value: string;
};

export type ExperimentFactors = {
  kindFactors: Factor[];
  amountFactors: Factor[];
  variableFactor: Factor | null;
};

export type FactorStore = {
  experiments: Record<string, ExperimentFactors>;
  setKindFactors: (experimentId: string, factors: Factor[]) => void;
  setAmountFactors: (experimentId: string, factors: Factor[]) => void;
  setVariableFactor: (experimentId: string, factor: Factor | null) => void;
  resetFactors: (experimentId: string) => void;
};

export const useFactorStore = create(
  persist<FactorStore>(
    (set) => ({
      experiments: {},

      setKindFactors: (experimentId, factors) =>
        set((state) => ({
          experiments: {
            ...state.experiments,
            [experimentId]: {
              ...state.experiments[experimentId],
              kindFactors: factors,
            },
          },
        })),

      setAmountFactors: (experimentId, factors) =>
        set((state) => ({
          experiments: {
            ...state.experiments,
            [experimentId]: {
              ...state.experiments[experimentId],
              amountFactors: factors,
            },
          },
        })),

      setVariableFactor: (experimentId, factor) =>
        set((state) => ({
          experiments: {
            ...state.experiments,
            [experimentId]: {
              ...state.experiments[experimentId],
              variableFactor: factor,
            },
          },
        })),

      resetFactors: (experimentId) =>
        set((state) => ({
          experiments: {
            ...state.experiments,
            [experimentId]: {
              kindFactors: [],
              amountFactors: [],
              variableFactor: null,
            },
          },
        })),
    }),
    {
      name: "factor-storage",
    }
  )
);
