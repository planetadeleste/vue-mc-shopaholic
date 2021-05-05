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

  interface Auth extends Model, AuthData {}
  class Auth extends Model {
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
  export { Auth };

  interface Brand extends Model, BrandData {}
  class Brand extends Model {}
  export { Brand };
  export class Brands extends Collection<Brand> {}

  interface Category extends Model, CategoryData {}
  class Category extends Model {}
  export { Category };
  export class Categories extends Collection<Category> {
    tree(): Promise<Response<CategoryData[]>>;
    byActive(): Categories;
    byTree(): Categories;
  }

  interface Group extends Model, GroupData {}
  class Group extends Model {}
  export { Group };
  export class Groups extends Collection<Group> {}

  interface Offer extends Model, OfferData {}
  class Offer extends Model {}
  export { Offer };

  interface Product extends Model, ProductData {}
  class Product extends Model {
    stats(): Promise<Response>;
    getOffers(): Promise<Response<OfferData[]>>;
    updateOffers(): Promise<void>;
  }
  export { Product };
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

  interface User extends Model, UserData {}
  class User extends Model {
    stats(): Promise<Response>;
  }
  export { User };
  export class Users extends Collection<User> {}
  export interface UserAddress extends Model, UserAddressData {}
}
