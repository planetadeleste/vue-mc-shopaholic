import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";
import { OfferData } from "@/types";

export default class Offer extends Model {
  defaults(): Record<keyof OfferData, any> {
    return {
      end_publish_at: null,
      start_publish_at: null,
      text: null,
      value: null,
      id: null,
      product_id: null,
      active: true,
      name: null,
      code: null,
      price: null,
      price_value: null,
      old_price: null,
      old_price_value: null,
      quantity: null,
      currency: null,
      preview_text: null,
      thumbnail: null,
      description: null,
      preview_image: null,
      images: [],
      property: [],
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      code: [cleanStr],
      description: [cleanStr],
      preview_text: [cleanStr],
      price: (sPrice?: string | number) => {
        if (!sPrice) {
          return this.get("price_value", 0);
        }
        return sPrice;
      },
      old_price: (sPrice?: string | number) => {
        if (!sPrice) {
          return this.get("old_price_value", 0);
        }
        return sPrice;
      },
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "offers.show",
      create: "offers.store",
      update: "offers.update",
      delete: "offers.destroy",
    };
  }
}
