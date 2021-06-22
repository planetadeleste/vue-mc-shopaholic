export interface CurrencyData {
  id: number;
  external_id: number | string;
  name: string;
  active: boolean;
  is_default: boolean;
  code: string;
  rate: string | number;
  symbol: string;
  created_at: string;
  updated_at: string;
}
