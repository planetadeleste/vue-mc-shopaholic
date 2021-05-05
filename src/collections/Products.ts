import { Collection } from "@planetadeleste/vue-mc";
import Product from "../models/Product";

export default class Products extends Collection<Product> {
  model(): typeof Product {
    return Product;
  }

  routes(): Record<string, any> {
    return {
      fetch: "products.index",
    };
  }

  /**
   * @returns {Products} Fetch active categories only
   */
  byActive(): Products {
    return this.filterBy({ active: 1 });
  }
}
