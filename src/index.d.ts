import {
  AuthData,
  BrandData,
  CategoryData,
  CurrencyData,
  GroupData,
  OfferData,
  ProductData,
  ProfileData,
  ResponseLoginRegisterData,
  ResponseProfileAvatarData,
  StatData,
  StatResponse,
  UserAddressData,
  UserAddressUpdateResponse,
  UserData,
  UserRegisterOptions,
} from "./types";

declare module "@planetadeleste/vue-mc-shopaholic" {
  import { Model, Collection } from "@planetadeleste/vue-mc";
  import { Response } from "vue-mc";

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

  interface Brand extends Model, BrandData {}
  class Brand extends Model {}
  export class Brands extends Collection<Brand> {
    list(): Promise<Response<BrandData[]>>;
  }

  interface Category extends Model, CategoryData {}
  class Category extends Model {}
  export class Categories extends Collection<Category> {
    tree(): Promise<Response<CategoryData[]>>;
    list(): Promise<Response<CategoryData[]>>;
    byActive(): Categories;
    byTree(): Categories;
  }

  interface Group extends Model, GroupData {}
  class Group extends Model {}
  export class Groups extends Collection<Group> {
    list(): Promise<Response<GroupData[]>>;
  }

  interface Offer extends Model, OfferData {}
  class Offer extends Model {}

  interface Product extends Model, ProductData {}
  class Product extends Model {
    stats(): Promise<Response<StatResponse>>;
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

  interface User extends Model, UserData {}
  class User extends Model {
    stats(): Promise<Response<StatResponse>>;
    loadAddress(): Promise<Response<UserAddressData[]>>;
    addAddress(
      obAddress: UserAddressData
    ): Promise<Response<UserAddressUpdateResponse>>;
    updateAddress(obAddress: UserAddressData): Promise<Response>;
    removeAddress(iAddressId: number): Promise<Response>;
  }
  export class Users extends Collection<User> {}

  interface UserAddress extends Model, UserAddressData {}
  class UserAddress extends Model {}

  interface Currency extends Model, CurrencyData {}
  class Currency extends Model {}
  export class Currencies extends Collection<Currency> {}

  export {
    Auth,
    AuthData,
    Brand,
    BrandData,
    Category,
    CategoryData,
    Currency,
    CurrencyData,
    Group,
    GroupData,
    Offer,
    OfferData,
    Product,
    ProductData,
    Profile,
    ProfileData,
    ResponseLoginRegisterData,
    ResponseProfileAvatarData,
    StatData,
    StatResponse,
    User,
    UserAddress,
    UserAddressData,
    UserAddressUpdateResponse,
    UserData,
    UserRegisterOptions,
  };
}
