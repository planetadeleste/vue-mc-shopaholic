import { Collection } from "@planetadeleste/vue-mc";
import { Response } from "vue-mc";
import Category from "../models/Category";
import { CategoryData } from "../types/Category";

export default class CategoryCollection extends Collection<Category> {
  model(): typeof Category {
    return Category;
  }

  options(): Record<string, any> {
    return {
      methods: {
        tree: "GET",
      },
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "categories.index",
      tree: "categories.tree",
      list: "categories.list",
    };
  }

  async tree(): Promise<Response<CategoryData[]>> {
    return await this.createCustomRequest("tree");
  }

  async list(): Promise<Response<CategoryData[]>> {
    return await this.createCustomRequest("list");
  }

  /**
   * @returns {CategoryCollection} Fetch active categories only
   */
  byActive<T extends CategoryCollection>(this: T): T {
    return this.filterBy({ active: 1 });
  }

  /**
   * @returns {CategoryCollection} Fetch categories by root tree
   */
  byTree<T extends CategoryCollection>(this: T): T {
    return this.filterBy({ tree: 1 });
  }
}
