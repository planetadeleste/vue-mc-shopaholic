import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { required, string } from "vue-mc/validation";
import { toNumber } from "lodash";
import Categories from "../collections/Categories";
export default class Category extends Model {
    defaults() {
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
    defineRelations() {
        return {
            children: {
                class: Categories,
            },
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
            fetch: "categories.show",
            create: "categories.store",
            update: "categories.update",
            delete: "categories.destroy",
        };
    }
}
//# sourceMappingURL=Category.js.map