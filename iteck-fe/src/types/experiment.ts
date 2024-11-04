export interface UniqueFactor {
  name: string;
  type: string;
  amount: number;
}

export interface ExperimentFile {
  name: string;
  file: File;
  factor: UniqueFactor[];
}

export interface ExperimentInfo {
  userName:string;
  title: string;
  memo:string;
  expDate: string;
}
