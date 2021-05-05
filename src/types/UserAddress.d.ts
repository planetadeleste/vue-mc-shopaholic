export interface UserAddressData {
  id?: number;
  user_id?: number;
  type?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  house?: string;
  building?: string;
  flat?: string;
  floor?: string;
  address1?: string;
  address2?: string;
  postcode?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserAddressUpdateResponse {
  id: number;
}
