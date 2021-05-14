import { FileData } from "@planetadeleste/vue-mc";

export interface OfferData {
  id: number;
  product_id: number;
  name: string;
  code: string;
  price: string;
  price_value: number;
  old_price: string;
  old_price_value: number;
  quantity: number;
  currency: string;
  preview_text: string;
  thumbnail: string;
  text: string;
  value: number;
  active: number;
  description: string;
  preview_image: string;
  images: FileData[];
  property: Record<string, any>;

  // TicketShopaholic plugin
  start_publish_at: string;
  end_publish_at: string;
}
