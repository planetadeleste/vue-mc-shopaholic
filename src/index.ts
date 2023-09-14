/**
 * Models and Collections for @planetadeleste/vue-mc-shopaholic plugin
 *
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 */

// COLLECTIONS
import BrandCollection from "./collections/BrandCollection";
import CategoryCollection from "./collections/CategoryCollection";
import CurrencyCollection from "./collections/CurrencyCollection";
import GroupCollection from "./collections/GroupCollection";
import ProductCollection from "./collections/ProductCollection";
import TaxCollection from "./collections/TaxCollection";
import UserCollection from "./collections/UserCollection";
// MODELS
import Auth from "./models/Auth";
import Brand from "./models/Brand";
import Category from "./models/Category";
import Currency from "./models/Currency";
import Group from "./models/Group";
import Offer from "./models/Offer";
import Product from "./models/Product";
import Profile from "./models/Profile";
import Tax from "./models/Tax";
import User from "./models/User";
import UserAddress from "./models/UserAddress";

export {
  Auth,
  Brand,
  BrandCollection,
  Category,
  CategoryCollection,
  Currency,
  CurrencyCollection,
  Group,
  GroupCollection,
  Offer,
  Product,
  ProductCollection,
  Profile,
  Tax,
  TaxCollection,
  User,
  UserAddress,
  UserCollection,
};
