import { Collection } from "@planetadeleste/vue-mc";
import Product from "../models/Product";

export default class ProductCollection extends Collection<Product> {
  model(): typeof Product {
    return Product;
  }

  routes(): Record<string, any> {
    return {
      fetch: "products.index",
    };
  }

  /**
   * @returns {ProductCollection} Fetch active categories only
   */
  byActive<T extends ProductCollection>(this: T): T {
    return this.filterBy({ active: 1 });
  }
}
