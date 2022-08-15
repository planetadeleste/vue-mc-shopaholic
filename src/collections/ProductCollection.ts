import { ProductData } from './../types/Product.d';
import { Collection } from '@planetadeleste/vue-mc';
import Product from '../models/Product';
import { Response } from '@planetadeleste/vuemc';

export default class ProductCollection extends Collection<Product> {
  model(): typeof Product {
    return Product;
  }

  routes(): Record<string, any> {
    return {
      fetch: 'products.index',
      list: 'products.list',
    };
  }

  /**
   * @returns {ProductCollection} Fetch active categories only
   */
  byActive<T extends ProductCollection>(this: T): T {
    return this.filterBy({ active: 1 });
  }

  async list(): Promise<Response<ProductData[]>> {
    return await this.createCustomRequest('list');
  }
}
