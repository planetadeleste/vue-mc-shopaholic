import { Collection } from "@planetadeleste/vue-mc";
import Currency from "../models/Currency";
import { Response } from "@planetadeleste/vuemc";
import { CurrencyData } from "@/types";

export default class CurrencyCollection extends Collection<Currency> {
  model(): typeof Currency {
    return Currency;
  }

  routes(): Record<string, any> {
    return {
      fetch: "currencies.index",
      list: "currencies.list",
    };
  }

  async list(): Promise<Response<CurrencyData[]>> {
    return await this.createCustomRequest("list");
  }

  byActive<T extends CurrencyCollection>(this: T): T {
    return this.filterBy({ active: 1 });
  }
}
