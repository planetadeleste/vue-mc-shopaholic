import { FileData } from "@planetadeleste/vue-mc";

export interface BrandData {
  id: number;
  active: boolean;
  name: string;
  slug: string;
  code: string;
  preview_text: string;
  preview_image: string;
  images: FileData[];
  created_at: string;
  updated_at: string;
  external_id: string;
  description: string;
  sort_order: number;
}
