import { GroupData } from "@/types";
import { Collection } from "@planetadeleste/vue-mc";
import { Response } from "vue-mc";
import Group from "../models/Group";

export default class Groups extends Collection<Group> {
  model(): typeof Group {
    return Group;
  }

  routes(): Record<string, any> {
    return {
      fetch: "groups.index",
      list: "groups.list",
    };
  }

  async list(): Promise<Response<GroupData[]>> {
    return await this.createCustomRequest("list");
  }
}
