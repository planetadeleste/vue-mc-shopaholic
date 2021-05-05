import { Collection } from "@planetadeleste/vue-mc";
import Group from "../models/Group";
export default class Groups extends Collection {
    model() {
        return Group;
    }
    routes() {
        return {
            fetch: "groups.index",
        };
    }
}
//# sourceMappingURL=Groups.js.map