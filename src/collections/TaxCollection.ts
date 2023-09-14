import { Collection } from "@planetadeleste/vue-mc";
import Tax from "../models/Tax";
import { Response } from "vue-mc";
import { TaxData } from "@/types";

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
}
