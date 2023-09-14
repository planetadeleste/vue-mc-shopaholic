import { Model } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";
import { TaxData } from "@/types";

export default class Tax extends Model {
  defaults(): Record<keyof TaxData, any> {
    return {
      id: null,
      active: true,
      description: null,
      is_global: false,
      percent: 0,
      sort_order: null,
      name: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
    };
  }

  validation(): Record<string, any> {
    return {};
  }

  routes(): Record<string, any> {
    return {
      fetch: "taxes.show",
      create: "taxes.store",
      update: "taxes.update",
      delete: "taxes.destroy",
    };
  }
}
