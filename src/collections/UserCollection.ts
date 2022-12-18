import { Collection } from '@planetadeleste/vue-mc';
import User from '../models/User';
import { Response } from '@planetadeleste/vuemc';
import { UserData } from '@/types';

export default class UserCollection extends Collection<User> {
  model() {
    return User;
  }

  routes(): Record<string, any> {
    return {
      fetch: 'users.index',
      list: 'users.list'
    };
  }

  async list(): Promise<Response<UserData[]>> {
    return await this.createCustomRequest('list');
  }

  byActive<T extends UserCollection>(this: T): T {
    return this.filterBy({ active: 1 });
  }
}
