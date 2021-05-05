import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";
import { required, string } from "vue-mc/validation";
export default class Brand extends Model {
    defaults() {
        return {
            id: null,
            name: null,
            slug: null,
            active: false,
            code: null,
            preview_text: null,
            preview_image: null,
            images: [],
            created_at: null,
            updated_at: null,
            external_id: null,
            description: null,
            sort_order: null,
        };
    }
    mutations() {
        return {
            id: (id) => toNumber(id) || null,
            name: [cleanStr],
            slug: [cleanStr],
            description: [cleanStr],
            preview_text: [cleanStr],
        };
    }
    validation() {
        return {
            name: required.and(string),
        };
    }
    routes() {
        return {
            fetch: "brands.show",
            create: "brands.store",
            update: "brands.update",
            delete: "brands.destroy",
        };
    }
}
//# sourceMappingURL=Brand.js.map