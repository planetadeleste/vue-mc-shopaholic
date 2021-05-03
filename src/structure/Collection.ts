import {
  Collection as BaseCollection,
  Model,
  Response,
  RouteResolver,
} from "vue-mc";
import { AxiosRequestConfig } from "axios";
import Request from "../request/Request";
import {
  get,
  invoke,
  isString,
  isPlainObject,
  isNil,
  has,
  isEmpty,
  assign,
  pickBy,
  isNumber,
  map,
} from "lodash";
import Base from "./Base";
import {
  ApiLinksResponse,
  ApiMetaResponse,
} from "@bit/planetadeleste.shopaholic.types.api";

export default class Collection<
  A extends Model = Model
> extends BaseCollection<A> {
  _baseClass!: Base;
  _links: ApiLinksResponse | Record<string, any> = {};
  _meta: ApiMetaResponse | Record<string, any> = {};

  _base(): Base {
    if (!this._baseClass) {
      this._baseClass = new Base();
    }

    return this._baseClass;
  }

  boot(): void {
    this._base();

    this.on("fetch", (obEvent: Record<string, any>) => {
      const sError = get(obEvent, "error");
      if (sError) {
        this.alert(sError);
      }
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
   * @param {string | Record<string, any>} [sRoute] Route key name
   * @param {Record<string, any>} [obData]
   * @returns {Promise<Response>}
   */
  async createCustomRequest(
    sMethod: string,
    sRoute?: string | Record<string, any>,
    obData?: Record<string, any>
  ): Promise<Response> {
    if (!isString(sRoute)) {
      if (isPlainObject(sRoute)) {
        obData = sRoute;
      }

      sRoute = sMethod;
    }

    const method = this.getOption(`methods.${sMethod}`);
    const route = this.getRoute(sRoute);
    const params = this.getRouteParameters();
    const url = this.getURL(route, params);

    return await this.createRequest({ method, url, data: obData }).send();
    // .then((response): void => {
    //   this.onFetchSuccess(response);
    // })
    // .catch((error: ResponseError): void => {
    //   this.onFetchFailure(error);
    // });
  }

  getModelsFromResponse(response: Response): any {
    const models: unknown = response.getData();

    // An empty, non-array response indicates that we didn't intend to send
    // any models in the response. This means that the current models are
    // already up to date, as no changes are necessary.
    if (isNil(models) || models === "") {
      return null;
    }

    // Add pagination meta/links properties
    if (has(models, "meta")) {
      this._meta = get(models, "meta");
      this.page(this._meta.current_page);
    }

    if (has(models, "links")) {
      this._links = get(models, "links");
    }

    // We're making an assumption here that paginated models are returned
    // within the "data" field of the response.
    if (this.isPaginated() || has(models, "data")) {
      return get(models, "data", models);
    }

    return models;
  }

  /*
   * PAGINATION METHODS
   */

  /**
   * Get the current collection page, gived from server response
   * @returns {number}
   */
  getCurrentPage<T extends Collection>(this: T): number {
    return get(this._meta, "current_page", 1);
  }

  /**
   * Get last collection page, gived from server response
   * @returns {number}
   */
  getLastPage<T extends Collection>(this: T): number {
    return get(this._meta, "last_page", 1);
  }

  /**
   * Get total number of collection items from server
   * @returns {number}
   */
  getTotalItems<T extends Collection>(this: T): number {
    return get(this._meta, "total", 0);
  }

  /**
   * Get pagination data
   * @returns {ApiMetaResponse}
   */
  getPaginationData<T extends Collection>(
    this: T
  ): ApiMetaResponse | Record<string, any> {
    return this._meta;
  }

  /**
   * Get pagination links for first, last, next and prev page
   * @returns {ApiLinksResponse}
   */
  getLinks<T extends Collection>(
    this: T
  ): ApiLinksResponse | Record<string, any> {
    return this._links;
  }

  /**
   *
   * @param {Object} filters JSON object to add filters param
   * @returns {Collection}
   */
  filterBy<T extends Collection>(this: T, filters: Record<string, any>): T {
    if (isEmpty(filters) || !isPlainObject(filters)) {
      return this;
    }

    if (has(filters, "filters")) {
      filters = get(filters, "filters");
    }

    const obFilters = this.get("filters", {});
    assign(obFilters, filters);

    this.set(
      "filters",
      pickBy(obFilters, (sValue: any) => {
        return isNumber(sValue) ? true : !isNil(sValue) && !isEmpty(sValue);
      })
    );

    return this;
  }

  /**
   * Limit number of records getting from query
   *
   * @param {Number} iCount Number of records to get
   */
  limit<T extends Collection>(this: T, iCount: number): T {
    this.set("limit", iCount);

    return this;
  }

  /**
   * @returns {Record<string, any>} A native representation of this collection models that will determine the contents of JSON.stringify(model).
   */
  getModelList<T extends Collection>(this: T): Record<string, any> {
    return map(this.getModels(), (obModel: A) => obModel.toJSON());
  }
}
