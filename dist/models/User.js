import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { toNumber, chain } from "lodash";
import { required, string, email } from "vue-mc/validation";
export default class User extends Model {
    defaults() {
        return {
            id: null,
            is_activated: false,
            name: null,
            email: null,
            groups: [],
            last_name: null,
            middle_name: null,
            phone: null,
            phone_list: null,
            avatar: null,
            property: [],
            address: null,
            password: null,
            password_confirmation: null,
            created_at: null,
            updated_at: null,
        };
    }
    mutations() {
        return {
            id: (id) => toNumber(id) || null,
            name: [cleanStr],
            email: [cleanStr],
        };
    }
    accessors() {
        return {
            fullName: () => {
                return chain([this.name, this.middle_name, this.last_name])
                    .compact()
                    .join(" ")
                    .value();
            },
        };
    }
    validation() {
        return {
            name: required.and(string),
            email: required.and(email),
        };
    }
    options() {
        return {
            methods: {
                stats: "GET",
            },
        };
    }
    routes() {
        return {
            fetch: "users.show",
            create: "users.store",
            update: "users.update",
            delete: "users.destroy",
            stats: "users.stats",
        };
    }
    async stats() {
        return await this.createCustomRequest("stats");
    }
}
//# sourceMappingURL=User.js.map