import { FileData } from "@planetadeleste/vue-mc";
import { BrandData } from "./Brand";
import { OfferData } from "./Offer";

export interface ProductData {
  id: number;
  category_id: number;
  brand_id: number;
  brand: BrandData;
  category: Record<string, any>;
  slug: string;
  name: string;
  category_name: string;
  offers: OfferData[];
  images: FileData[];
  preview_image: string;
  preview_text: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  external_id: string;
  description: string;
  secondary_thumb: string;
  thumbnail: string;
  code: string;
}
