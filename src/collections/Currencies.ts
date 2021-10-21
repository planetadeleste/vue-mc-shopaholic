import { Collection } from "@planetadeleste/vue-mc";
import Currency from "../models/Currency";
import { Response } from "vue-mc";
import { CurrencyData } from "@/types";

export default class Currencies extends Collection<Currency> {
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
}
