import { Model } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";

export default class Tax extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      name: null,
      is_global: false,
      active: true,
      percent: null,
      description: null,
      sort_order: null,
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
