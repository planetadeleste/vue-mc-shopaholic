import { Collection } from "@planetadeleste/vue-mc";
import __model__ from "../models/__model__";

export default class __model__Collection extends Collection<__model__> {
  model(): typeof __model__ {
    return __model__;
  }

  routes(): Record<string, any> {
    return {
      fetch: "__route__(noCase).index",
    };
  }
}
