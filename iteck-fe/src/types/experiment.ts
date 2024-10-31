export interface UniqueFactor {
  name: string;
  type: string;
  amount: number;
}

export interface Experiment {
  title: string;
  executed_at: Date;
  memo: string;
  files: string[];
  unique_factors: UniqueFactor[];
}
