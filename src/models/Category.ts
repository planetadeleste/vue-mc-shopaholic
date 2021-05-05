import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { required, string } from "vue-mc/validation";
import { toNumber } from "lodash";
import Categories from "../collections/Categories";

export default class Category extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      parent_id: null,
      active: false,
      name: null,
      code: null,
      slug: null,
      preview_image: null,
      images: [],
      preview_text: null,
      created_at: null,
      updated_at: null,
      description: null,
      external_id: null,
    };
  }

  defineRelations(): Record<string, any> {
    return {
      children: {
        class: Categories,
      },
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      slug: [cleanStr],
      description: [cleanStr],
      preview_text: [cleanStr],
    };
  }

  validation(): Record<string, any> {
    return {
      name: required.and(string),
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "categories.show",
      create: "categories.store",
      update: "categories.update",
      delete: "categories.destroy",
    };
  }
}
