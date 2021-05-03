import { RouteResolver } from "vue-mc";
import { VuexModule } from "vuex-module-decorators";
import { AxiosStatic } from "axios";

export default class Base {
  static $resolve: RouteResolver;
  static $flashModule: VuexModule;
  static $loadingModule: VuexModule;
  static $authModule: VuexModule;
  static $http: AxiosStatic;

  get flashModule(): VuexModule {
    return Base.$flashModule;
  }

  get loadingModule(): VuexModule {
    return Base.$loadingModule;
  }

  get authModule(): VuexModule {
    return Base.$authModule;
  }
}
