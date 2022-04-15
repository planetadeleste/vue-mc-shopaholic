import { Model } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";
import { required } from "@planetadeleste/vuemc/validation";
import { CurrencyData } from "@/types";

export default class Currency extends Model<CurrencyData> {
  defaults(): Record<string, any> {
    return {
      id: null,
      external_id: null,
      name: null,
      active: true,
      is_default: false,
      code: null,
      rate: 1,
      symbol: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
    };
  }

  validation(): Record<string, any> {
    return {
      name: required,
      code: required,
      symbol: required,
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "currencies.show",
      create: "currencies.store",
      update: "currencies.update",
      delete: "currencies.destroy",
    };
  }
}
