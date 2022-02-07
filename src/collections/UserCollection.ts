import { Collection } from "@planetadeleste/vue-mc";
import User from "../models/User";

export default class UserCollection extends Collection<User> {
  model(): typeof User {
    return User;
  }

  routes(): Record<string, any> {
    return {
      fetch: "users.index",
    };
  }

  byActive<T extends UserCollection>(this: T): T {
    return this.filterBy({ active: 1 });
  }
}
