export interface Factor {
  name: string;
  type: string;
  amount: number
  ;
}

export interface Electrode {
  area: string;
  loading: string;
  rollingRate: string;
}
export interface ExperimentFile {
  name: string;
  file: File;
  factor: Factor[];
  electrode: Electrode;
}

export interface ExperimentInfo {
  userName:string;
  title: string;
  memo:string;
  expDate: string;
}