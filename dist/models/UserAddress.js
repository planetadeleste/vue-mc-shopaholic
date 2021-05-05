import { Model } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";
export default class UserAddress extends Model {
    defaults() {
        return {
            id: null,
            user_id: null,
            type: null,
            country: null,
            state: null,
            city: null,
            street: null,
            house: null,
            building: null,
            flat: null,
            floor: null,
            address1: null,
            address2: null,
            postcode: null,
            created_at: null,
            updated_at: null,
        };
    }
    mutations() {
        return {
            id: (id) => toNumber(id) || null,
        };
    }
}
//# sourceMappingURL=UserAddress.js.map