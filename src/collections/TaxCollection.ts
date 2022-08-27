import { TaxData } from './../types/Tax.d';
import { Collection } from "@planetadeleste/vue-mc";
import Tax from "../models/Tax";
import { Response } from '@planetadeleste/vuemc';

export default class TaxCollection extends Collection<Tax> {
  model(): typeof Tax {
    return Tax;
  }

  routes(): Record<string, any> {
    return {
      fetch: "taxes.index",
      list: "taxes.list",
    };
  }

  async list(): Promise<Response<TaxData[]>> {
    return await this.createCustomRequest("list");
  }

  byActive<T extends TaxCollection>(this: T): T {
    return this.filterBy({ active: 1 });
  }
}
