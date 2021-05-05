import { Collection } from "@planetadeleste/vue-mc";
import User from "../models/User";
export default class Users extends Collection {
    model() {
        return User;
    }
    routes() {
        return {
            fetch: "users.index",
        };
    }
}
//# sourceMappingURL=Users.js.map