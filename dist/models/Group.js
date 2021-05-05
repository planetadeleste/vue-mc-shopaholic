import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";
import { required, string } from "vue-mc/validation";
export default class Group extends Model {
    defaults() {
        return {
            id: null,
            name: null,
            code: null,
            description: null,
        };
    }
    mutations() {
        return {
            id: (id) => toNumber(id) || null,
            name: [cleanStr],
            code: [cleanStr],
        };
    }
    validation() {
        return {
            name: required.and(string),
        };
    }
    routes() {
        return {
            fetch: "groups.show",
            create: "groups.store",
            update: "groups.update",
            delete: "groups.destroy",
        };
    }
}
//# sourceMappingURL=Group.js.map