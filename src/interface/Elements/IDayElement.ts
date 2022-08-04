export interface IDayElementParams {
  dayNumeric: number;
  date: Date;
  classList?: string[];
  eventListener?: {
    type: string;
    callback: (event: Event) => void;
  };
}
