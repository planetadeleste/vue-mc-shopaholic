export interface UserAddressData {
  id: number;
  user_id: number;
  type: string;
  country: string | number;
  state: string | number;
  city: string | number;
  country_text: string;
  state_text: string;
  city_text: string;
  street: string;
  house: string | number;
  building: string;
  flat: string | number;
  floor: string | number;
  address1: string;
  address2: string;
  postcode: string;
  created_at: string;
  updated_at: string;
}

export interface UserAddressUpdateResponse {
  id: number;
}
