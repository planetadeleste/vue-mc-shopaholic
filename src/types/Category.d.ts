import { FileData } from "@planetadeleste/vue-mc";

export interface CategoryData {
  id: number;
  parent_id: number;
  active: boolean;
  name: string;
  code: string;
  slug: string;
  preview_image: string;
  images: FileData[];
  preview_text: string;
  created_at: string;
  updated_at: string;
  description: string;
  external_id: string;
  children: CategoryData[];
}
