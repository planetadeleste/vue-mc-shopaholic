/**
 * Models and Collections for PlanetaDelEsteApiShopaholic plugin
 *
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 */

// COLLECTIONS
import Brands from "./collections/Brands";
import Categories from "./collections/Categories";
import Currencies from "./collections/Currencies";
import Groups from "./collections/Groups";
import Products from "./collections/Products";
import Users from "./collections/Users";

export { Brands, Categories, Currencies, Groups, Products, Users };

// MODELS
import Auth from "./models/Auth";
import Brand from "./models/Brand";
import Category from "./models/Category";
import Currency from "./models/Currency";
import Group from "./models/Group";
import Offer from "./models/Offer";
import Product from "./models/Product";
import Profile from "./models/Profile";
import User from "./models/User";
import UserAddress from "./models/UserAddress";

export {
  Auth,
  Brand,
  Category,
  Currency,
  Group,
  Offer,
  Product,
  Profile,
  User,
  UserAddress,
};
