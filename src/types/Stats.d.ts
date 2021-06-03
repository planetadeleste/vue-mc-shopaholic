export interface StatData {
  start: string;
  end: string;
  value: number;
  increments: number;
  decrements: number;
  difference: number;
}

export interface StatResponse {
  total: number;
  months: StatData[];
}