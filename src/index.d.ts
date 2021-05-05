import {
  AuthData,
  BrandData,
  CategoryData,
  GroupData,
  OfferData,
  ProductData,
  ProfileData,
  UserRegisterOptions,
  ResponseLoginRegisterData,
  ResponseProfileAvatarData,
  UserData,
  UserAddressData,
  UserAddressUpdateResponse,
} from "./types";

declare module "@planetadeleste/vue-mc-shopaholic" {
  import { Model, Collection } from "@planetadeleste/vue-mc";
  import { Response } from "vue-mc";

  export {
    AuthData,
    BrandData,
    CategoryData,
    GroupData,
    OfferData,
    ProductData,
    ProfileData,
    UserRegisterOptions,
    ResponseLoginRegisterData,
    ResponseProfileAvatarData,
    UserData,
    UserAddressData,
    UserAddressUpdateResponse,
  };

  export interface Auth extends Model, AuthData {
    check(): Promise<Response>;
    csrf(): Promise<Response>;
    refresh(): Promise<Response>;
    login(login: string, password: string): Promise<Response>;
    logout(): Promise<Response>;
    register(obData: Record<string, any>): Promise<Response>;
    restorePassword(sEmail: string): Promise<Response>;
    resetPassword(
      sCode: string,
      sPass: string,
      sPassConfirm: string
    ): Promise<Response>;
    checkResetCode(sCode: string): Promise<Response>;
  }

  export interface Brand extends Model, BrandData {}
  export class Brands extends Collection<Brand> {}

  export interface Category extends Model, CategoryData {}
  export class Categories extends Collection<Category> {
    tree(): Promise<Response<CategoryData[]>>;
    byActive(): Categories;
    byTree(): Categories;
  }

  export interface Group extends Model, GroupData {}
  export class Groups extends Collection<Group> {}

  export interface Offer extends Model, OfferData {}

  export interface Product extends Model, ProductData {
    stats(): Promise<Response>;
    getOffers(): Promise<Response<OfferData[]>>;
    updateOffers(): Promise<void>;
  }
  export class Products extends Collection<Product> {
    byActive(): Products;
  }

  export type RecordProfileData = UserRegisterOptions & Record<string, any>;
  interface Profile extends Model, ProfileData {}
  class Profile extends Model {
    loadAvatar(): Promise<Response<ResponseProfileAvatarData>>;
    loadAddress(): Promise<Response<UserAddressData[]>>;
    addAddress(
      obAddress: UserAddressData
    ): Promise<Response<UserAddressUpdateResponse>>;
    updateAddress(obAddress: UserAddressData): Promise<Response>;
    removeAddress(iAddressId: number): Promise<Response>;
    login(
      login: string,
      password: string
    ): Promise<Response<ResponseLoginRegisterData>>;
    register(
      obData: RecordProfileData
    ): Promise<Response<ResponseLoginRegisterData>>;
    logout(): Promise<Response>;
  }
  export { Profile };

  export interface User extends Model, UserData {
    stats(): Promise<Response>;
  }
  export class Users extends Collection<User> {}
  export interface UserAddress extends Model, UserAddressData {}
}
