import { Model } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";

export default class __model__ extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
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
      fetch: "__route__(noCase).show",
      create: "__route__(noCase).store",
      update: "__route__(noCase).update",
      delete: "__route__(noCase).destroy",
    };
  }
}
