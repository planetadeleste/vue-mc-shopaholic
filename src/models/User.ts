import { StatResponse, UserAddressData, UserAddressUpdateResponse } from "@/types";
import { Model, cleanStr } from "@planetadeleste/vue-mc";
import { toNumber, chain } from "lodash";
import { Response } from "vue-mc";
import { required, string, email } from "vue-mc/validation";

export default class User extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      is_activated: true,
      name: null,
      email: null,
      groups: [],
      last_name: null,
      middle_name: null,
      phone: null,
      phone_list: null,
      avatar: null,
      property: {},
      address: null,
      password: null,
      password_confirmation: null,
      created_at: null,
      updated_at: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      email: [cleanStr],
    };
  }

  accessors(): Record<string, any> {
    return {
      fullName: () => {
        return chain([this.name, this.middle_name, this.last_name])
          .compact()
          .join(" ")
          .value();
      },
    };
  }

  validation(): Record<string, any> {
    return {
      name: required.and(string),
      email: required.and(email),
    };
  }

  options(): Record<string, any> {
    return {
      methods: {
        stats: "GET",
      },
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "users.show",
      create: "users.store",
      update: "users.update",
      delete: "users.destroy",
      stats: "users.stats",

      address: "users.address",
      addAddress: "users.address.add",
      updateAddress: "users.address.update",
      removeAddress: "users.address.remove",
    };
  }

  async stats(): Promise<Response<StatResponse>> {
    return await this.createCustomRequest("stats");
  }

  /**
   * @description Load current user addresses
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @return {*}  {Promise<Response<UserAddressData[]>>}
   * @memberof Profile
   */
  async loadAddress(): Promise<Response<UserAddressData[]>> {
    return await this.createCustomRequest("address", ["id"]);
  }

  /**
   * @description Create a new address on current user
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {UserAddressData} obAddress
   * @return {*}  {Promise<Response<UserAddressUpdateResponse>>}
   * @memberof Profile
   */
  async addAddress(
    obAddress: UserAddressData
  ): Promise<Response<UserAddressUpdateResponse>> {
    return await this.createCustomRequest("addAddress", obAddress);
  }

  /**
   * @description Update address data from current user
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {UserAddressData} obAddress
   * @return {*}  {Promise<Response>}
   * @memberof Profile
   */
  async updateAddress(obAddress: UserAddressData): Promise<Response> {
    return await this.createCustomRequest("updateAddress", obAddress);
  }

  /**
   * @description Remove address from current user
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {number} iAddressId
   * @return {*}  {Promise<Response>}
   * @memberof Profile
   */
  async removeAddress(iAddressId: number): Promise<Response> {
    return await this.createCustomRequest("removeAddress", { id: iAddressId });
  }
}
