import { UserAddressData } from "./UserAddress";

export interface UserData {
  id: number;
  groups: string[];
  email: string;
  name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  phone_short: string;
  phone_list: string[];
  avatar: string;
  property: Record<string, any>;
  address: UserAddressData[];
  role: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  activation_code: string;
  persist_code: string;
  reset_password_code: string;
  permissions: string;
  is_activated: boolean;
  activated_at: string;
  last_login: string;
  is_superuser: boolean;
  active_currency_code: string;
}
