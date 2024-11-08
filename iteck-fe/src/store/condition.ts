import {create} from 'zustand';

export type Factor = {
  name: string;
  isVariable: boolean;
  isFixed: boolean;
  value: string;
};

export type FactorStore = {
  kindFactors: Factor[];
  amountFactors: Factor[];
  variableFactor: Factor | null;
  setKindFactors: (factors: Factor[]) => void;
  setAmountFactors: (factors: Factor[]) => void;
  setVariableFactor: (factor: Factor | null) => void;
  resetFactors: () => void;
};

export const useFactorStore = create<FactorStore>((set) => ({
  kindFactors: [],
  amountFactors: [],
  variableFactor: null,
  
  setKindFactors: (factors) => set({ kindFactors: factors }),
  setAmountFactors: (factors) => set({ amountFactors: factors }),
  setVariableFactor: (factor) => set({ variableFactor: factor }),

  resetFactors: () =>
    set({
      kindFactors: [],
      amountFactors: [],
      variableFactor: null,
    }),
}));
