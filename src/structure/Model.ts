import Vue from "vue";
import Base from "./Base";
import {
  Model as BaseModel,
  RequestOptions,
  Response,
  RouteResolver,
} from "vue-mc";
import { AxiosRequestConfig } from "axios";
import Request from "../request/Request";
import { serialize } from "object-to-formdata";
import {
  isUndefined,
  isBoolean,
  set,
  isPlainObject,
  has,
  isNil,
  unionBy,
  each,
  cloneDeep,
  mapValues,
  flow,
  invoke,
  isString,
  isArray,
  isEmpty,
  pick,
  isObject,
  forEach,
  defaultTo,
  assign,
} from "lodash";

type Constructor<T> = new (...args: any[]) => T;

export interface RelationConfig {
  class: Constructor<Model>;
  foreignKey?: string;
  localKey?: string;
  aliases?: string[];
}

export default class Model extends BaseModel {
  private _accessors!: Record<string, Accessor>;
  private _relations!: Record<string, Constructor<Model>>;
  private _baseClass!: Base;
  private _silently!: boolean;
  private _base() {
    if (!this._baseClass) {
      this._baseClass = new Base();
    }

    return this._baseClass;
  }

  boot(): void {
    this._base();
    Vue.set(this, "_relations", {});
    Vue.set(this, "_accessors", {});
    this._silently = false;

    this.compileAccessors();
    this.assignRelations();

    this.on("fetch", (obEvent: Record<string, Model>) => {
      const obModel = obEvent.target;
      const attrs = obModel.attributes;
      if (has(attrs, "data") && isNil(obModel.id)) {
        this.clear();
        this.assign(attrs.data);
      }
    });
  }

  get relations(): Record<string, Constructor<Model>> {
    return this._relations;
  }

  silenty<T extends Model>(this: T, bEvent?: boolean): T {
    if (isUndefined(bEvent) || !isBoolean(bEvent)) {
      this._silently = true;
    } else if (isBoolean(bEvent)) {
      this._silently = bEvent;
    }

    return this;
  }

  definedRelations(): Record<string, RelationConfig> {
    return {};
  }

  setRelation<T extends Model>(
    this: T,
    name: string,
    config: RelationConfig,
    relation: Record<string, any>
  ): T {
    if (relation && isPlainObject(relation)) {
      relation = new config.class(relation);
    }

    const foreignKey = config.foreignKey || `${name}_id`;
    const localKey = config.localKey || "id";

    Vue.set(this._relations, name, relation);
    const value = relation ? relation[localKey] : null;
    this.set(foreignKey, value);

    return this;
  }

  getRelation(name: string): Constructor<Model> {
    return this._relations[name];
  }

  registerRelation<T extends Model>(
    this: T,
    name: string,
    config: RelationConfig
  ): T {
    const names = unionBy([name], config.aliases);

    each(names, (item: string) => {
      const exist = !isUndefined(this[item]); // I can't find how to set Relations before super() method.

      Object.defineProperty(this, item, {
        get: () => this.getRelation(name),
        set: (relation) => this.setRelation(name, config, relation),
      });

      if (exist) {
        set(this, item, cloneDeep(this.get(item)));
        this.unset(item);
      }
    });

    return this;
  }

  assignRelations(): void {
    each(this.definedRelations(), (config, name) => {
      this.registerRelation(name, config);
    });
  }

  /**
   * The isDirty method determines if any of the model's attributes have
   * been changed since the model was retrieved. You may pass a specific
   * attribute name to the isDirty method to determine if a particular
   * attribute is dirty.
   *
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @return {boolean}
   * @memberof Model
   */
  isDirty(sKey?: string): boolean {
    const arChanged = this.changed();
    if (!arChanged) {
      return false;
    }

    return sKey ? arChanged.includes(sKey) : true;
  }

  /**
   *  @returns {Object} Attribute accessor keyed by attribute name.
   */
  accessors(): Record<string, Accessor | Accessor[]> {
    return {};
  }

  /**
   * Compiles all accessors into pipelines that can be executed quickly.
   */
  compileAccessors(): void {
    this._accessors = mapValues(
      this.accessors(),
      (m: Accessor | Accessor[]): Accessor => flow(m as Accessor[])
    );

    this.on("sync", this.assignAccessors.bind(this));
  }

  /**
   * Sync all accessors with model attributes
   */
  assignAccessors(): void {
    each(this._accessors, (fAccessor: Accessor, sKey) => {
      this.set(sKey, fAccessor());
    });
  }

  getRouteResolver(): RouteResolver {
    return Base.$resolve;
  }

  /**
   * Send an alert message to Flash store service
   *
   * @param {string} sMessage Alert Message
   * @param {string} sType Alert type (error, info, success)
   */
  alert(sMessage: string, sType = "error"): string {
    if (!Base.$flashModule) {
      return sMessage;
    }

    invoke(Base.$flashModule, sType, sMessage);
    return sMessage;
  }

  /**
   * @returns {Request} A new `Request` using the given configuration.
   */
  createRequest(config: AxiosRequestConfig): Request {
    const obRequest = new Request(config);
    return obRequest;
  }

  /**
   * Create a custom request, using option.method, route and data
   *
   * @param {string} sMethod Method key name
   * @param {string | Record<string, any> | string[]} [sRoute] Route key name, model data or key params
   * @param {Record<string, any> | string[]} [obData] Model data or key params
   * @param {string[]} [arParams] Param keys to pick from model attributes
   * @returns {Promise<Response>}
   */
  async createCustomRequest(
    sMethod: string,
    sRoute?: string | Record<string, any> | string[],
    obData?: Record<string, any> | string[],
    arParams?: string[]
  ): Promise<Response> {
    if (!isString(sRoute)) {
      if (isArray(sRoute)) {
        arParams = sRoute;
        obData = {};
      } else if (isPlainObject(sRoute)) {
        if (isArray(obData)) {
          arParams = obData;
        }
        obData = sRoute;
      }

      sRoute = sMethod;
    }

    if (isUndefined(arParams)) {
      arParams = [];
    }

    if (isUndefined(obData)) {
      obData = {};
    }

    if (this._silently) {
      set(obData, "silently", this._silently);
    }

    const method = this.getOption(`methods.${sMethod}`);
    const route = this.getRoute(sRoute);
    const params = isEmpty(arParams)
      ? {}
      : pick(this.getRouteParameters(), arParams);
    const url = this.getURL(route, params);

    return await this.createRequest({ method, url, data: obData }).send();
  }

  /**
   * @returns {Object} The data to send to the server when saving this model.
   */
  getSaveData(): Record<string, any> {
    if (!this.isNew()) {
      this.set("_method", "PUT");
    }

    return super.getSaveData();
  }

  /**
   * Iterates over elements of data to find instanceof File
   *
   * @param {Object} data
   * @returns {Boolean}
   */
  private hasFileUpload(data: any): boolean {
    let hasFile = false;

    if (data instanceof File) {
      return true;
    }

    if (isArray(data) || isObject(data)) {
      forEach(data, (item: any) => {
        if (this.hasFileUpload(item)) {
          hasFile = true;
        }
      });
    } else if (data instanceof File) {
      hasFile = true;
    }

    return hasFile;
  }

  /**
   * Detect instance of File in saved data ams call upload or save methods.
   * Persists data to the database/API.
   *
   * @param {options}             Save options
   * @param {options.method}      Save HTTP method
   * @param {options.url}         Save URL
   * @param {options.data}        Save data
   * @param {options.params}      Query params
   * @param {options.headers}     Query headers
   *
   * @returns {Promise}
   */
  store(options: RequestOptions = {}): Promise<Response<any> | null> {
    let data = defaultTo(options.data, this.getSaveData());

    if (this.hasFileUpload(data)) {
      data = serialize(data, { indices: true, booleansAsIntegers: true });
    }

    assign(options, { data });

    return this.save(options);
  }
}

export type Accessor = (value?: any) => any;
