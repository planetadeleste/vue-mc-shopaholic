import { Model } from "@planetadeleste/vue-mc";
import { toNumber } from "lodash";

export default class UserAddress extends Model {
  defaults(): Record<string, any> {
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

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
    };
  }
}
