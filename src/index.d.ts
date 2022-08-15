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
} from './types';

declare module '@planetadeleste/vue-mc-shopaholic' {
  import { Model, Collection } from '@planetadeleste/vue-mc';
  import { Response } from '@planetadeleste/vuemc';

  interface Auth extends Model<AuthData>, AuthData {}
  class Auth extends Model<AuthData> {
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

  interface Brand extends Model<BrandData>, BrandData {}
  class Brand extends Model<BrandData> {}
  class BrandCollection extends Collection<Brand> {
    list(): Promise<Response<BrandData[]>>;
    byActive<T extends BrandCollection>(this: T): T;
  }

  interface Category extends Model<CategoryData>, CategoryData {}
  class Category extends Model<CategoryData> {}
  class CategoryCollection extends Collection<Category> {
    tree(): Promise<Response<CategoryData[]>>;
    list(): Promise<Response<CategoryData[]>>;
    byActive<T extends CategoryCollection>(this: T): T;
    byTree<T extends CategoryCollection>(this: T): T;
  }

  interface Group extends Model<GroupData>, GroupData {}
  class Group extends Model<GroupData> {}
  class GroupCollection extends Collection<Group> {
    list(): Promise<Response<GroupData[]>>;
  }

  interface Offer extends Model<OfferData>, OfferData {}
  class Offer extends Model<OfferData> {}

  interface Product extends Model<ProductData>, ProductData {}
  class Product extends Model<ProductData> {
    stats(): Promise<Response<StatResponse>>;
    getOffers(): Promise<Response<OfferData[]>>;
    updateOffers(): Promise<void>;
  }
  class ProductCollection extends Collection<Product> {
    byActive<T extends ProductCollection>(this: T): T;
    list(): Promise<Response<ProductData[]>>;
  }

  type RecordProfileData = UserRegisterOptions & Record<string, any>;
  interface Profile extends Model<ProfileData>, ProfileData {}
  class Profile extends Model<ProfileData> {
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

  interface User extends Model<UserData>, UserData {}
  class User extends Model<UserData> {
    stats(): Promise<Response<StatResponse>>;
    loadAddress(): Promise<Response<UserAddressData[]>>;
    addAddress(
      obAddress: UserAddressData
    ): Promise<Response<UserAddressUpdateResponse>>;
    updateAddress(obAddress: UserAddressData): Promise<Response>;
    removeAddress(iAddressId: number): Promise<Response>;
  }
  class UserCollection extends Collection<User> {
    byActive<T extends UserCollection>(this: T): T;
  }

  interface UserAddress extends Model<UserAddressData>, UserAddressData {}
  class UserAddress extends Model<UserAddressData> {}

  interface Currency extends Model<CurrencyData>, CurrencyData {}
  class Currency extends Model<CurrencyData> {}
  class CurrencyCollection extends Collection<Currency> {
    list(): Promise<Response<CurrencyData[]>>;
    byActive<T extends CurrencyCollection>(this: T): T;
  }

  export {
    Auth,
    AuthData,
    Brand,
    BrandData,
    BrandCollection,
    CategoryCollection,
    Category,
    CategoryData,
    CurrencyCollection,
    Currency,
    CurrencyData,
    Group,
    GroupData,
    GroupCollection,
    Offer,
    OfferData,
    Product,
    ProductData,
    ProductCollection,
    Profile,
    ProfileData,
    RecordProfileData,
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
    UserCollection,
  };
}
