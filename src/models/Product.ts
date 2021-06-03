import { OfferData, StatResponse } from "@/types";
import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";
import { Response } from "vue-mc";
import { required, string } from "vue-mc/validation";

/**
 * @description
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 * @export
 * @class Product
 * @extends {Model}
 * @property {number} id
 * @property {number} category_id
 * @property {number} brand_id
 * @property {Category} category
 * @property {string} slug
 * @property {string} name
 * @property {string} category_name
 * @property {Array<OfferData>} offers
 * @property {Array<OCFileData>} images
 * @property {string} preview_image
 * @property {string} preview_text
 * @property {string} created_at
 * @property {string} updated_at
 * @property {boolean} active
 * @property {string} external_id
 * @property {string} description
 * @property {string} secondary_thumb
 * @property {string} thumbnail
 * @property {string} code
 */
export default class Product extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      category_id: null,
      brand_id: null,
      active: false,
      slug: null,
      name: null,
      category_name: null,
      offers: [],
      images: [],
      preview_image: null,
      preview_text: null,
      created_at: null,
      updated_at: null,
      external_id: null,
      description: null,
      code: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      slug: [cleanStr],
      description: [cleanStr],
      preview_text: [cleanStr],
    };
  }

  validation(): Record<string, any> {
    return {
      name: required.and(string),
    };
  }

  options(): Record<string, any> {
    return {
      methods: {
        stats: "GET",
        offers: "GET",
      },
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "products.show",
      create: "products.store",
      update: "products.update",
      delete: "products.destroy",
      stats: "products.stats",
      offers: "products.offers",
    };
  }

  async stats(): Promise<Response<StatResponse>> {
    return await this.createCustomRequest("stats", []);
  }

  /**
   * Get offers from server
   */
  async getOffers(): Promise<Response<OfferData[]>> {
    return await this.createCustomRequest("offers", ["id"]);
  }

  /**
   * Reload offers from server
   */
  async updateOffers(): Promise<void> {
    const obOffers = await this.getOffers().then((obResponse) =>
      obResponse.getData()
    );
    if (obOffers && obOffers.data) {
      this.set("offers", obOffers.data);
    }
  }
}
