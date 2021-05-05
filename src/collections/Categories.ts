import { Collection } from "@planetadeleste/vue-mc";
import { Response } from "vue-mc";
import Category from "../models/Category";
import { CategoryData } from "../types/Category";

export default class Categories extends Collection<Category> {
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
    };
  }

  async tree(): Promise<Response<CategoryData[]>> {
    return await this.createCustomRequest("tree");
  }

  /**
   * @returns {Categories} Fetch active categories only
   */
  byActive(): Categories {
    return this.filterBy({ active: 1 });
  }

  /**
   * @returns {Categories} Fetch categories by root tree
   */
  byTree(): Categories {
    return this.filterBy({ tree: 1 });
  }
}
