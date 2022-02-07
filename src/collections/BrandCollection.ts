import { BrandData } from "@/types";
import { Collection } from "@planetadeleste/vue-mc";
import { Response } from "vue-mc";
import Brand from "../models/Brand";

export default class BrandCollection extends Collection<Brand> {
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

  byActive<T extends BrandCollection>(this: T): T {
    return this.filterBy({ active: 1 });
  }
}
