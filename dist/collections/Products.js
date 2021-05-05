import { Collection } from "@planetadeleste/vue-mc";
import Product from "../models/Product";
export default class Products extends Collection {
    model() {
        return Product;
    }
    routes() {
        return {
            fetch: "products.index",
        };
    }
    /**
     * @returns {Products} Fetch active categories only
     */
    byActive() {
        return this.filterBy({ active: 1 });
    }
}
//# sourceMappingURL=Products.js.map