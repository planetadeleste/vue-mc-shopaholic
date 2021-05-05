import { UserAddressData } from "./UserAddress";

export interface UserData {
  id: number;
  groups: string[];
  email: string;
  name: string;
  last_name: string | undefined;
  middle_name: string | undefined;
  phone: string | undefined;
  phone_list: string[] | undefined;
  socialite_token: string[] | undefined;
  avatar: string | undefined;
  property: any[] | undefined;
  address: UserAddressData[];
  role: string;
  created_at?: string;
  updated_at?: string;
}
