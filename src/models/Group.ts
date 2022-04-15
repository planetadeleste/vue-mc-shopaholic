import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";
import { required, string } from "@planetadeleste/vuemc/validation";
import { GroupData } from "@/types";

export default class Group extends Model<GroupData> {
  defaults(): Record<string, any> {
    return {
      id: null,
      name: null,
      code: null,
      description: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      code: [cleanStr],
    };
  }

  validation(): Record<string, any> {
    return {
      name: required.and(string),
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "groups.show",
      create: "groups.store",
      update: "groups.update",
      delete: "groups.destroy",
    };
  }
}
