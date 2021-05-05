import { Collection } from "@planetadeleste/vue-mc";
import Brand from "../models/Brand";
export default class Brands extends Collection {
    model() {
        return Brand;
    }
    routes() {
        return {
            fetch: "brands.index",
        };
    }
}
//# sourceMappingURL=Brands.js.map