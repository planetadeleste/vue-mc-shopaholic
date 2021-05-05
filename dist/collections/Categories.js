import { Collection } from "@planetadeleste/vue-mc";
import Category from "../models/Category";
export default class Categories extends Collection {
    model() {
        return Category;
    }
    options() {
        return {
            methods: {
                tree: "GET",
            },
        };
    }
    routes() {
        return {
            fetch: "categories.index",
            tree: "categories.tree",
        };
    }
    async tree() {
        return await this.createCustomRequest("tree");
    }
    /**
     * @returns {Categories} Fetch active categories only
     */
    byActive() {
        return this.filterBy({ active: 1 });
    }
    /**
     * @returns {Categories} Fetch categories by root tree
     */
    byTree() {
        return this.filterBy({ tree: 1 });
    }
}
//# sourceMappingURL=Categories.js.map