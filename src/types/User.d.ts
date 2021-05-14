import { UserAddressData } from "./UserAddress";

export interface UserData {
  id: number;
  groups: string[];
  email: string;
  name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  phone_list: string[];
  socialite_token: string[];
  avatar: string;
  property: Record<string, any>;
  address: UserAddressData[];
  role: string;
  created_at?: string;
  updated_at?: string;
}
