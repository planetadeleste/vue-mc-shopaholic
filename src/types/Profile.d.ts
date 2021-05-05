import { UserAddressData } from "./UserAddress";

export interface ProfileData {
  id: number;
  groups: string[];
  email: string;
  name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  phone_list: string[];
  avatar: string;
  property: Record<string, any>;
  address: UserAddressData[];
  role: string;
  created_at?: string;
  updated_at?: string;
}

export type UserRegisterOptions = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export interface ResponseLoginRegisterData {
  expires_in: number;
  token: string;
  user?: ProfileData;
}

export interface ResponseProfileAvatarData {
  avatar: string | null;
}
