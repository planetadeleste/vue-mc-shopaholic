import { OfferData } from "@/types";
import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";

/**
 * Offer model
 *
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 * @export
 * @class Offer
 * @extends {Model}
 * @property {number} id
 * @property {number} product_id
 * @property {string} name
 * @property {string} code
 * @property {number} price
 * @property {number} price_value
 * @property {number} old_price
 * @property {number} old_price_value
 * @property {number} quantity
 * @property {string} currency
 * @property {string} preview_text
 * @property {string} thumbnail
 * @property {boolean} active
 * @property {string} description
 * @property {string} preview_image
 * @property {array} images
 * @property {array} property
 */
export default class Offer extends Model<OfferData> {
  defaults(): Record<string, any> {
    return {
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
          return this.price_value;
        }
        return sPrice;
      },
      old_price: (sPrice?: string | number) => {
        if (!sPrice) {
          return this.old_price_value;
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
