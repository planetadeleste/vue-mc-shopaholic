import { Collection } from "@planetadeleste/vue-mc";
import Currency from "../models/Currency";

export default class Currencies extends Collection<Currency> {
  model(): typeof Currency {
    return Currency;
  }

  routes(): Record<string, any> {
    return {
      fetch: "currencies.index",
    };
  }
}
