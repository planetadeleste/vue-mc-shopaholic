import { BrandData } from "@/types";
import { Collection } from "@planetadeleste/vue-mc";
import { Response } from "vue-mc";
import Brand from "../models/Brand";

export default class Brands extends Collection<Brand> {
  model(): typeof Brand {
    return Brand;
  }

  routes(): Record<string, any> {
    return {
      fetch: "brands.index",
      list: "brands.list",
    };
  }

  async list(): Promise<Response<BrandData[]>> {
    return await this.createCustomRequest("list");
  }
}
