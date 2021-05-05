import { Collection } from "@planetadeleste/vue-mc";
import Brand from "../models/Brand";

export default class Brands extends Collection<Brand> {
  model(): typeof Brand {
    return Brand;
  }

  routes(): Record<string, any> {
    return {
      fetch: "brands.index",
    };
  }
}
