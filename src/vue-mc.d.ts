/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
declare module "vue-mc" {
  import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

  export interface Result<T = Record<string, any>> {
    status: boolean;
    data: T;
    message: string | null;
    code: string | null;
    links?: ApiLinksResponse[];
    meta?: ApiMetaResponse[];
  }

  // ERRORS
  export class ValidationError {
    message: string;
    errors: Errors | Errors[];
    stack?: string;
    constructor(errors: Errors | Errors[], message?: string);
    toString(): string;
    getValidationErrors(): Errors | Errors[];
  }

  export type Errors = Record<string, string | string[]>;

  // HTTP
  export interface BaseResponse {
    getData(): unknown;
    getStatus(): number;
    getHeaders(): unknown;
    getValidationErrors(): unknown;
  }

  export class ProxyResponse {
    data: Record<string, any>;
    headers: Record<string, any>;
    status: number;
    constructor(
      status: number,
      data?: Record<string, any>,
      headers?: Record<string, any>
    );
    getData(): Record<string, any>;
    getStatus(): number;
    getHeaders(): Record<string, any>;
    getValidationErrors(): Record<string, any>;
  }

  export class Request {
    config: AxiosRequestConfig;
    constructor(config: AxiosRequestConfig);
    /**
     * Creates a custom response using a given Axios response.
     */
    createResponse(axiosResponse?: AxiosResponse): Response;
    /**
     * Creates a custom response error using a given Axios response error.
     */
    createError(axiosError: AxiosError): RequestError;
    /**
     * @returns {Promise}
     */
    send(): Promise<Response>;
  }

  type ResultData<T> = Result<T> & Record<string, any>;

  export class Response<T = any> {
    response?: AxiosResponse;
    constructor(response?: AxiosResponse);
    getData(): ResultData<T>;
    getStatus(): number;
    getHeaders(): any;
    getValidationErrors(): Record<string, any> | null;
  }

  // STRUCTURES
  type ConstructorOf<A> = new (...args: any[]) => A;

  export declare enum RequestOperation {
    REQUEST_CONTINUE = 0,
    REQUEST_REDUNDANT = 1,
    REQUEST_SKIP = 2,
  }

  /**
   * Base class for all things common between Model and Collection.
   */
  export declare abstract class Base {
    static readonly REQUEST_CONTINUE = RequestOperation.REQUEST_CONTINUE;
    static readonly REQUEST_REDUNDANT = RequestOperation.REQUEST_REDUNDANT;
    static readonly REQUEST_SKIP = RequestOperation.REQUEST_SKIP;

    readonly _uid: string;
    private readonly _listeners: Record<string, Listener[]>;
    private readonly _options: Record<string, any>;

    protected constructor(options: Options);
    /**
     * @returns {string} The class name of this instance.
     */
    get $class(): string;
    /**
     * Called after construction, this hook allows you to add some extra setup
     * logic without having to override the constructor.
     */
    boot(): void;
    /**
     * Returns a route configuration in the form {key: name}, where key may be
     * 'save', 'fetch', 'delete' or any other custom key, and the name is what
     * will be passed to the route resolver to generate the URL. See @getURL
     *
     * @returns {Object}
     */
    routes(): Routes;
    /**
     * Returns the default context for all events emitted by this instance.
     *
     * @returns {Object}
     */
    getDefaultEventContext(): {
      target: Base;
    };
    /**
     * @returns {string} Default string representation.
     */
    toString(): string;
    /**
     * Emits an event by name to all registered listeners on that event.

     * Listeners will be called in the order that they were added. If a listener
     * returns `false`, no other listeners will be called.
     *
     * @param {string} event    The name of the event to emit.
     * @param {Object} context  The context of the event, passed to listeners.
     */
    emit(event: string, context?: Record<string, any>): void;
    /**
     * Registers an event listener for a given event.
     *
     * Event names can be comma-separated to register multiple events.
     *
     * @param {string}   event      The name of the event to listen for.
     * @param {function} listener   The event listener, accepts context.
     */
    on(event: string, listener: Listener): void;
    /**
     * @returns {Object} Parameters to use for replacement in route patterns.
     */
    getRouteParameters(): Record<string, string>;
    /**
     * @returns {RegExp|string} Pattern to match and group route parameters.
     */
    getRouteParameterPattern(): RegExp | string;
    /**
     * @returns {RegExp} The default route parameter pattern.
     */
    getDefaultRouteParameterPattern(): RegExp;
    /**
     * @returns {Object} This class' default options.
     */
    getDefaultOptions(): Options;
    /**
     * @param {Array|string} path     Option path resolved by `get`
     * @param {*}            fallback Fallback value if the option is not set.
     *
     * @returns {*} The value of the given option path.
     */
    getOption(path: string | string[], fallback?: any): any;
    /**
     * @returns {Object} This instance's default options.
     */
    options(): Options;
    /**
     * Sets an option.
     *
     * @param {string} path
     * @param {*}      value
     */
    setOption(path: string, value: any): void;
    /**
     * Sets all given options. Successive values for the same option won't be
     * overwritten, so this follows the 'defaults' behaviour, and not 'merge'.
     *
     * @param {...Object} options One or more objects of options.
     */
    setOptions(...options: Options[]): void;
    /**
     * Returns all the options that are currently set on this instance.
     *
     * @return {Object}
     */
    getOptions(): Options;
    /**
     * Returns a function that translates a route key and parameters to a URL.
     *
     * @returns {Function} Will be passed `route` and `parameters`
     */
    getRouteResolver(): RouteResolver;
    /**
     * @returns {Object} An object consisting of all route string replacements.
     */
    getRouteReplacements(
      route: string,
      parameters?: Record<string, string>
    ): Record<string, string>;
    /**
     * Returns the default URL provider, which assumes that route keys are URL's,
     * and parameter replacement syntax is in the form "{param}".
     *
     * @returns {Function}
     */
    getDefaultRouteResolver(): RouteResolver;
    /**
     * @returns {Object} The data to send to the server when saving this model.
     */
    getDeleteBody(): any;
    /**
     * @returns {Object} Query parameters that will be appended to the `fetch` URL.
     */
    getFetchQuery(): Record<string, any>;
    /**
     * @returns {Object} Query parameters that will be appended to the `save` URL.
     */
    getSaveQuery(): Record<string, any>;
    /**
     * @returns {Object} Query parameters that will be appended to the `delete` URL.
     */
    getDeleteQuery(): Record<string, any>;
    /**
     * @returns {string} The key to use when generating the `fetch` URL.
     */
    getFetchRoute(): string;
    /**
     * @returns {string} The key to use when generating the `save` URL.
     */
    getSaveRoute(): string;
    /**
     * @returns {string} The key to use when generating the `delete` URL.
     */
    getDeleteRoute(): string;
    /**
     * @returns {Object} Headers to use when making any request.
     */
    getDefaultHeaders(): Record<string, any>;
    /**
     * @returns {Object} Headers to use when making a save request.
     */
    getSaveHeaders(): Record<string, any>;
    /**
     * @returns {Object} Headers to use when making a fetch request.
     */
    getFetchHeaders(): Record<string, any>;
    /**
     * @returns {Object} Headers to use when making a delete request.
     */
    getDeleteHeaders(): Record<string, any>;
    /**
     * @returns {Object} Default HTTP methods.
     */
    getDefaultMethods(): Record<string, any>;
    /**
     * @returns {string} HTTP method to use when making a save request.
     */
    getSaveMethod(): Method;
    /**
     * @returns {string} HTTP method to use when making a fetch request.
     */
    getFetchMethod(): Method;
    /**
     * @returns {string} HTTP method to use when updating a resource.
     */
    getUpdateMethod(): Method;
    /**
     * @returns {string} HTTP method to use when patching a resource.
     */
    getPatchMethod(): Method;
    /**
     * @returns {string} HTTP method to use when creating a resource.
     */
    getCreateMethod(): Method;
    /**
     * @returns {string} HTTP method to use when deleting a resource.
     */
    getDeleteMethod(): Method;
    /**
     * @returns {number} The HTTP status code that indicates a validation error.
     */
    getValidationErrorStatus(): number;
    /**
     * @returns {boolean} `true` if the response indicates a validation error.
     */
    isBackendValidationError(error: RequestError | any): boolean;
    /**
     * @return {string|undefined} Route value by key.
     */
    getRoute(key: string, fallback?: string): string;
    /**
     * @returns {string} The full URL to use when making a fetch request.
     */
    getFetchURL(): string;
    /**
     * @returns {string} The full URL to use when making a save request.
     */
    getSaveURL(): string;
    /**
     * @returns {string} The full URL to use when making a delete request.
     */
    getDeleteURL(): string;
    /**
     * @param {string} route      The route key to use to generate the URL.
     * @param {Object} parameters Route parameters.
     *
     * @returns {string} A URL that was generated using the given route key.
     */
    getURL(route: string, parameters?: Record<string, any>): string;
    /**
     * @returns {Request} A new `Request` using the given configuration.
     */
    createRequest(config: AxiosRequestConfig): Request;
    /**
     * Creates a request error based on a given existing error and optional response.
     */
    createRequestError(error: any, response: Response): RequestError;
    /**
     * Creates a response error based on a given existing error and response.
     */
    createResponseError(error: any, response?: Response): ResponseError;
    /**
     * Creates a validation error using given errors and an optional message.
     */
    createValidationError(
      errors: Errors | Errors[],
      message?: string
    ): ValidationError;
    /**
     * This is the central component for all HTTP requests and handling.
     *
     * @param  {Object}     config      Request configuration
     * @param  {function}   onRequest   Called before the request is made.
     * @param  {function}   onSuccess   Called when the request was successful.
     * @param  {function}   onFailure   Called when the request failed.
     */
    request(
      config: AxiosRequestConfig | (() => AxiosRequestConfig),
      onRequest: OnRequestCallback,
      onSuccess: RequestSuccessCallback,
      onFailure: RequestFailureCallback
    ): Promise<Response | null>;
    abstract onFetch(): Promise<RequestOperation>;
    abstract onFetchFailure(error: any, response: Response | undefined): void;
    abstract onFetchSuccess(response: Response | null): void;
    /**
     * Fetches data from the database/API.
     *
     * @param {options}             Fetch options
     * @param {options.method}      Fetch HTTP method
     * @param {options.url}         Fetch URL
     * @param {options.params}      Query params
     * @param {options.headers}     Query headers
     *
     * @returns {Promise}
     */
    fetch(options?: RequestOptions): Promise<Response | null>;
    abstract getSaveData(): Record<any, any>;
    abstract onSave(): Promise<RequestOperation>;
    abstract onSaveFailure(error: any, response: Response | undefined): void;
    abstract onSaveSuccess(response: BaseResponse | null): void;
    /**
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
    save(options?: RequestOptions): Promise<Response | null>;
    /**
     * Converts given data to FormData for uploading.
     *
     * @param  {Object} data
     * @returns {FormData}
     */
    convertObjectToFormData(data: Record<string, string | Blob>): FormData;
    /**
     * Persists data to the database/API using FormData.
     *
     * @param {options}             Save options
     * @param {options.method}      Save HTTP method
     * @param {options.url}         Save URL
     * @param {options.params}      Query params
     * @param {options.headers}     Query headers
     *
     * @returns {Promise}
     */
    upload(options?: Record<any, any>): Promise<Response | null>;
    abstract onDelete(): Promise<RequestOperation>;
    abstract onDeleteFailure(error: any, response: Response | undefined): void;
    abstract onDeleteSuccess(response: Response | null): void;
    /**
     * Removes model or collection data from the database/API.
     *
     * @param {options}             Delete options
     * @param {options.method}      Delete HTTP method
     * @param {options.url}         Delete URL
     * @param {options.params}      Query params
     * @param {options.headers}     Query headers
     *
     * @returns {Promise}
     */
    delete(options?: RequestOptions): Promise<Response | null>;
  }

  export interface Options {
    [key: string]: any;
    model?: typeof Model;
    methods?: Partial<Record<RequestType, HttpMethods>>;
    routeParameterPattern?: RegExp;
    useDeleteBody?: boolean;
  }
  export declare type Routes = Record<
    "fetch" | "save" | "delete" | string,
    string
  >;
  export declare type Listener = (context: Record<string, any>) => void;
  export declare type RouteResolver = (
    route: string,
    parameters: Record<string, string>
  ) => string;
  export declare type RequestFailureCallback = (
    error: any,
    response: Response | undefined
  ) => void;
  export declare type RequestSuccessCallback = (
    response: Response | null
  ) => void;
  export declare type OnRequestCallback = () => Promise<number | boolean>;
  export declare type HttpMethods =
    | "GET"
    | "POST"
    | "PATCH"
    | "PUT"
    | "DELETE"
    | string;
  export declare type RequestType =
    | "fetch"
    | "save"
    | "update"
    | "create"
    | "patch"
    | "delete"
    | string;
  export interface RequestOptions {
    url?: string;
    method?: Method;
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, any>;
  }

  export declare class Collection<A extends Model = Model> extends Base {
    models: A[];
    readonly loading: boolean;
    readonly saving: boolean;
    readonly deleting: boolean;
    readonly fatal: boolean;

    private readonly _attributes: Record<string, any>;
    private readonly _page: number | null;
    private readonly _registry: Record<string, string>;
    /**
     * Accessor to support Array.length semantics.
     */
    get length(): number;
    /**
     * Creates a new instance, called when using 'new'.
     *
     * @param  {Array}  [models]    Models to add to this collection.
     * @param  {Object} [options]   Extra options to set on this collection.
     */
    constructor(
      models?: A[],
      options?: Options,
      attributes?: Record<string, any>
    );
    /**
     * Creates a copy of this collection. Model references are preserved so
     * changes to the models inside the clone will also affect the subject.
     *
     * @returns {Collection}
     */
    clone<T extends Collection>(): T;
    /**
     * @return {A} The class/constructor for this collection's model type.
     */
    model(): ConstructorOf<A>;
    /**
     * @return {Object} Default attributes
     */
    defaults(): Record<string, any>;
    /**
     * @return {*} The value of an attribute, or a given fallback if not set.
     */
    get(attribute: string, fallback?: any): any;
    /**
     * Sets an attribute's value, or an object of attributes.
     *
     * @param {string|Object} attribute
     * @param {*}             value
     */
    set(attribute: string | Record<string, any>, value?: any): void;
    /**
     * @return {Object}
     */
    getAttributes(): Record<string, any>;
    /**
     * @return {A[]}
     */
    getModels(): A[];
    /**
     * Returns the default options for this model.
     *
     * @returns {Object}
     */
    getDefaultOptions(): Options;
    /**
     * @returns {Object} Parameters to use for replacement in route patterns.
     */
    getRouteParameters(): Record<string, any>;
    /**
     * Removes all errors from the models in this collection.
     */
    clearErrors(): void;
    /**
     * Resets model state, ie. `loading`, etc back to their initial states.
     */
    clearState(): void;
    /**
     * Removes all models from this collection.
     */
    clearModels(): void;
    /**
     * Removes all models from this collection.
     */
    clear(): void;
    /**
     * Syncs all models in this collection. This method delegates to each model
     * so follows the same signature and effects as `Model.sync`.
     */
    sync(): void;
    /**
     * Resets all models in this collection. This method delegates to each model
     * so follows the same signature and effects as `Model.reset`.
     *
     * @param {string|string[]} attribute
     */
    reset(...attribute: string[]): void;
    /**
     * Returns the number of models in this collection.
     */
    size(): number;
    /**
     * @returns {boolean} `true` if the collection is empty, `false` otherwise.
     */
    isEmpty(): boolean;
    /**
     * @returns {Object} A native representation of this collection that will
     *                   determine the contents of JSON.stringify(collection).
     */
    toJSON(): A[];
    /**
     * @returns {Promise}
     */
    validate(): Promise<ValidationResultErrorFinalResult[]>;
    /**
     * Create a new model of this collection's model type.
     *
     * @param {Object} attributes
     *
     * @returns {A} A new instance of this collection's model.
     */
    createModel(attributes: Record<string, any>): Record<string, any>;
    /**
     * Removes a model from the model registry.
     *
     * @param {A} model
     */
    removeModelFromRegistry(model: A): void;
    /**
     * @return {Boolean} true if this collection has the model in its registry.
     */
    hasModelInRegistry(model: A): boolean;
    /**
     * Adds a model from the model registry.
     *
     * @param {A} model
     */
    addModelToRegistry(model: A): void;
    /**
     * Called when a model has been added to this collection.
     *
     * @param {A} model
     */
    onAdd(model: A): void;
    /**
     * Adds a model to this collection.
     *
     * This method returns a single model if only one was given, but will return
     * an array of all added models if an array was given.
     *
     * @param {A|Array|Object} model Adds a model instance or plain object,
     *                                   or an array of either, to this collection.
     *                                   A model instance will be created and
     *                                   returned if passed a plain object.
     *
     * @returns {A|Array} The added model or array of added models.
     */
    add(model: A[]): A[];
    add(model?: A | Partial<A> | Record<string, any>): A;
    /**
     * Called when a model has been removed from this collection.
     *
     * @param {A} model
     */
    onRemove(model: A): void;
    /**
     * Removes a model at a given index.
     *
     * @param  {number} index

     * @returns {A} The model that was removed, or `undefined` if invalid.
     * @throws  {Error} If a model could not be found at the given index.
     */
    _removeModelAtIndex(index: number): A | undefined;
    /**
     * Removes a `Model` from this collection.
     *
     * @param  {A} model
     *
     * @return {A}
     */
    _removeModel(model: A): A | undefined;
    /**
     * Removes the given model from this collection.
     *
     * @param  {A|Object|Array} model Model to remove, which can be a `Model`
     *                                    instance, an object to filter by,
     *                                    a function to filter by, or an array
     *                                    of any of the above to remove multiple.
     *
     * @return {A|A[]} The deleted model or an array of models if a filter
     *                         or array type was given.
     *
     * @throws {Error} If the model is an invalid type.
     */
    remove(model: A): A;
    remove(model: A[] | Partial<A> | ((model: A) => boolean)): A[];
    /**
     * Determines whether a given value is an instance of a model.
     *
     * @param  {*} candidate A model candidate
     *
     * @return {boolean} `true` if the given `model` is an instance of Model.
     */
    isModel(candidate: any): boolean;
    /**
     * Returns the zero-based index of the given model in this collection.
     *
     * @see {@link https://lodash.com/docs/#findIndex}
     *
     * @return {number} the index of a model in this collection, or -1 if not found.
     */
    indexOf(model: A): number;
    /**
     * @param {string|function|Object} where
     *
     * @return {A} The first model that matches the given criteria, or
     *                 `undefined` if none could be found.
     *
     * @see {@link https://lodash.com/docs/#find}
     */
    find(where: Predicate): A | undefined;
    /**
     * Creates a new collection of the same type that contains only the models
     * for which the given predicate returns `true` for, or matches by property.
     *
     * @see {@link where}
     *
     * Important: Even though this returns a new collection, the references to
     *            each model are preserved, so changes will propagate to both.
     *
     * @param {function|Object|string} predicate Receives `model`.
     *
     * @returns {Collection}
     */
    filter<T extends Collection>(predicate: Predicate): T;

    /**
     * Returns the models for which the given predicate returns `true` for,
     * or models that match attributes in an object.
     *
     * @see {@link https://lodash.com/docs/#filter}
     *
     * @param {function|Object|string} predicate Receives `model`.
     *
     * @returns {A[]}
     */
    where(predicate: Predicate): A[];
    /**
     * Returns an array that contains the returned result after applying a
     * function to each model in this collection.
     *
     * @see {@link https://lodash.com/docs/#map}
     *
     * @param {function} callback Receives `model`.
     *
     * @return {A[]}
     */
    map<T = A>(callback: string | ((model: A) => T)): T[];
    /**
     * Iterates through all models, calling a given callback for each one.
     *
     * @see {@link https://lodash.com/docs/#each}
     *
     * @param {function} callback Receives `model` and `index`.
     */
    each(callback: (model: A) => void): void;
    /**
     * Reduces this collection to a value which is the accumulated result of
     * running each model through `iteratee`, where each successive invocation
     * is supplied the return value of the previous.
     *
     * If `initial` is not given, the first model of the collection is used
     * as the initial value.
     *
     * @param {function} iteratee Invoked with three arguments:
     *                            (result, model, index)
     *
     * @param {*} [initial] The initial value to use for the `result`.
     *
     * @returns {*} The final value of result, after the last iteration.
     */
    reduce<U = A>(
      iteratee: (result: U | undefined, model: A, index: number) => U,
      initial?: U
    ): U | undefined;
    /**
     * @param {function|string} iteratee Attribute name or callback to determine
     *                                   which values to sum by. Invoked with a
     *                                   single argument `model`.
     *
     * @returns {number} Sum of all models, accessed by attribute or callback.
     */
    sum(iteratee: ((model: A) => number) | string): number;
    /**
     * Returns an object composed of keys generated from the results of running
     * each model through `iteratee`. The corresponding value of each key is the
     * number of times the key was returned by iteratee.
     *
     * @see {@link https://lodash.com/docs/#countBy}
     *
     * @returns {Object}
     */
    count(iteratee: (model: A) => any): Record<string, number>;
    /**
     * Sorts this collection's models using a comparator. This method performs
     * a stable sort (it preserves the original sort order of equal elements).
     *
     * @see {@link https://lodash.com/docs/#sortBy}
     *
     * @param {function|string} comparator Attribute name or attribute function,
     *                                     invoked with a single arg `model`.
     */
    sort(comparator: ((model: A) => any) | string): void;
    /**
     * @param {A|Object} model
     *
     * @returns {boolean} `true` if this collection contains the given model,
     *                    `false` otherwise.
     */
    has(model: A): boolean;
    /**
     * @returns {A|undefined} The first model of this collection.
     */
    first(): A | undefined;
    /**
     * @returns {A|undefined} The last model of this collection.
     */
    last(): A | undefined;
    /**
     * Removes and returns the first model of this collection, if there was one.
     *
     * @returns {A|undefined} Removed model or undefined if there were none.
     */
    shift(): A | undefined;
    /**
     * Removes and returns the last model of this collection, if there was one.
     *
     * @returns {A|undefined} Removed model or undefined if there were none.
     */
    pop(): A | undefined;
    /**
     * Replaces all models in this collection with those provided. This is
     * effectively equivalent to `clear` and `add`, and will result in an empty
     * collection if no models were provided.
     *
     * @param {A|A[]} models Models to replace the current models with.
     */
    replace(models: A | A[]): void;
    /**
     * Returns the query parameters that should be used when paginating.
     *
     * @return {Object}
     */
    getPaginationQuery(): {
      page: number | null;
    };
    /**
     * @inheritDoc
     */
    getFetchQuery(): Record<string, any>;
    /**
     * @param {Object} response
     *
     * @returns {Array|null} Models from the response.
     */
    getModelsFromResponse(response: Response): any;
    /**
     * Called when a save request was successful.
     *
     * @param {Object} response
     */
    onSaveSuccess(response: Response): void;
    /**
     * @returns {A[]} Models in this collection that are in a "saving" state.
     */
    getSavingModels(): A[];
    /**
     * @returns {A[]} Models in this collection that are in a "deleting" state.
     */
    getDeletingModels(): A[];
    /**
     * Applies an array of validation errors to this collection's models.
     *
     * @param  {Array}   errors
     * @param  {integer} status Response status
     */
    applyValidationErrorArray(errors: any[]): void;
    /**
     * Applies an object of validation errors keyed by model identifiers.
     *
     * @param  {Array}   errors
     * @param  {integer} status Response status
     */
    applyValidationErrorObject(
      errors: Record<string, Record<string, string | string[]>>
    ): void;
    /**
     * Sets validation errors on this collection's models.
     *
     * @param {Array|Object} errors Either an array of length equal to the number
     *                              of models in this collection, or an object
     *                              of errors keyed by model identifiers.
     */
    setErrors(
      errors: any[] | Record<string, Record<string, string | string[]>>
    ): void;
    /**
     * @returns {Array} An array of this collection's validation errors.
     */
    getErrors(): Record<string, string | string[]>[];
    /**
     * Called when a save request resulted in a validation error.
     *
     * @param {Object} response
     */
    onSaveValidationFailure(error: any): void;
    /**
     * Called when a save request resulted in an unexpected error,
     * eg. an internal server error (500)
     *
     * @param {Error}  error
     * @param {Object} response
     */
    onFatalSaveFailure(error: any, response?: any): void;
    /**
     * Called when a save request failed.
     *
     * @param {Error}  error
     * @param {Object} response
     */
    onSaveFailure(error: any): void;
    /**
     * @returns {Array} The data to use for saving.
     */
    getSaveData(): Record<string, any>;
    /**
     * Sets the page on this collection, enabling pagination. To disable
     * pagination on this collection, pass page as `null` or `undefined`.
     *
     * @param {number|boolean} [page] Page number, or `null` to disable.
     *
     * @returns {Collection} This collection.
     */
    page<T extends Collection>(page: number | boolean): T;
    /**
     * @returns {integer|null} The page that this collection is on.
     */
    getPage(): number | null;
    /**
     * @returns {boolean} Whether this collection is currently paginated.
     */
    isPaginated(): boolean;
    /**
     * @returns {boolean} Whether this collection is on the last page,
     *                            ie. there won't be more results that follow.
     */
    isLastPage(): boolean;
    /**
     * Responsible for adjusting the page and appending of models that were
     * received by a paginated fetch request.
     *
     * @param {A[]} models
     */
    applyPagination(models: A[]): void;
    /**
     * Called when a fetch request was successful.
     *
     * @param {Object} response
     */
    onFetchSuccess(response: Response): void;
    /**
     * Called when a fetch request failed.
     *
     * @param {Error}  error
     */
    onFetchFailure(error: any): void;
    /**
     * Called before a fetch request is made.
     *
     * @returns {boolean|undefined} `false` if the request should not be made.
     */
    onFetch(): Promise<RequestOperation>;
    /**
     * Called when a delete request was successful.
     *
     * @param {Object} response
     */
    onDeleteSuccess(response: Response): void;
    /**
     * Called when a delete request resulted in a general error.
     *
     * @param {Error}  error
     * @param {Object} response
     */
    onDeleteFailure(error: any): void;
    /**
     * Called before a save request is made.
     *
     * @returns {boolean} Either `true` or false` if the request should not be
     *                    made, where `true` indicates that the request should
     *                    be considered a "success" rather than a "cancel".
     *
     */
    onSave(): Promise<RequestOperation>;
    /**
     * Collect all model identifiers.
     *
     * @returns {Array}
     */
    getIdentifiers(models: A[]): string[];
    /**
     * @inheritDoc
     */
    getDeleteBody(): string[] | Record<string, string>;
    /**
     * @returns {string} The query parameter key to use for model identifiers.
     */
    getDeleteQueryIdenitifierKey(): string;
    /**
     * @inheritDoc
     */
    getDeleteQuery(): Record<string, string>;
    /**
     * Called before a delete request is made.
     *
     * @returns {boolean} `false` if the request should not be made.
     */
    onDelete(): Promise<RequestOperation>;
    /**
     * Convert collection to Array. All models inside are converted to JSON
     *
     * @return {object[]} converted collection
     */
    toArray(): Record<string, any>[];
  }

  export declare type Predicate<T = boolean> =
    | ((model: Model) => T)
    | string
    | Record<string, any>
    | Model
    | Partial<Model>;

  export declare class Model extends Base {
    [key: string]: any;
    readonly loading: boolean;
    readonly saving: boolean;
    readonly deleting: boolean;
    readonly fatal: boolean;

    private readonly _attributes: Record<string, any>;
    private readonly _collections: Collection[];
    private readonly _reference: Record<string, any>;
    private readonly _errors: Record<string, string[]>;
    private _mutations: Record<string, Mutation>;
    /**
     * A convenience wrapper around the model's attributes that are saved.
     * This is similar to the `saved` method, but instead of accessing a single
     * property it returns the whole saved object, so that you can do something
     * like model.$.attribute when you want to display it somewhere.
     *
     * @returns {Object} This model's saved, reference data.
     */
    get $(): Record<string, any>;
    /**
     * @returns {Object} This model's "active" state attributes.
     */
    get attributes(): Record<string, any>;
    /**
     * @returns {Object} The collection that this model is registered to.
     */
    get collections(): Collection[];
    /**
     * @returns {Object} This model's errors, which are cleared automatically.
     */
    get errors(): Record<string, string | string[]>;
    /**
     * Creates a new instance, called when using 'new'.
     *
     * @param  {Object}     [attributes]  Model attributes
     * @param  {Collection} [collection]  Collection that this model belongs to.
     * @param  {Object}     [options]     Options to set on the model.
     */
    constructor(
      attributes?: Record<string, any>,
      collection?: Collection | null,
      options?: Record<string, any>
    );
    /**
     * Creates a copy of this model, with the same attributes and options. The
     * clone will also belong to the same collections as the subject.
     *
     * @returns {Model}
     */
    clone<T extends Model>(): T;
    /**
     * Prepare certain methods to only be called once. These are methods that
     * are expected to return the same data every time.
     *
     * @see {@link https://lodash.com/docs/#once}
     */
    memoize(): void;
    /**
     * Returns the model's identifier value.
     */
    identifier(): string;
    /**
     * @returns {Object} An empty representation of this model.
     *                   It's important that all model attributes have a default
     *                   value in order to be reactive in Vue.
     */
    defaults(): Record<string, any>;
    /**
     * @returns {Object} Attribute mutations keyed by attribute name.
     */
    mutations(): Record<string, Mutation | Mutation[]>;
    /**
     * Add validation rules here, or use option?
     */
    validation(): Record<string, Rule>;
    /**
     * Returns the default options for this model.
     *
     * @returns {Object}
     */
    getDefaultOptions(): ModelOptions;
    /**
     * Compiles all mutations into pipelines that can be executed quickly.
     */
    compileMutators(): void;
    /**
     * @returns {Object} Parameters to use for replacement in route patterns.
     */
    getRouteParameters(): Record<string, any>;
    /**
     * Registers a collection on this model. When this model is created it will
     * automatically be added to the collection. Similarly, when this model is
     * delete it will be remove from the collection. Registering the same
     * collection more than once has no effect.
     *
     * @param {Collection} collection
     */
    registerCollection(collection: Collection | Collection[]): void;
    /**
     * Removes a collection from this model's collection registry, removing all
     * effects that would occur when creating or deleting this model.
     *
     * Unregistering a collection that isn't registered has no effect.
     *
     * @param {Collection} collection
     */
    unregisterCollection(collection: Collection): void;
    /**
     * Reverts all attributes back to their defaults, and completely removes all
     * attributes that don't have defaults. This will also sync the reference
     * attributes, and is not reversable.
     */
    clearAttributes(): void;
    /**
     * Reverts all attributes back to their defaults, and completely removes all
     * attributes that don't have defaults. This will also sync the reference
     * attributes, and is not reversable.
     */
    clear(): void;
    /**
     * Resets model state, ie. `loading`, etc back to their initial states.
     */
    clearState(): void;
    /**
     * Assigns all given model data to the model's attributes and reference.
     * This will also fill any gaps using the model's default attributes.
     *
     * @param {Object} attributes
     *
     * @returns {Object} The attributes that were assigned to the model.
     */
    assign(attributes: Record<string, any>): void;
    /**
     * Resets all attributes back to their reference values (source of truth).
     * A good use case for this is when form fields are bound directly to the
     * model's attributes. Changing values in the form fields will change the
     * attributes on the model. On cancel, you can revert the model back to
     * its saved, original state using reset().
     *
     * You can also pass one or an array of attributes to reset.
     *
     * @param {string|string[]} attribute
     */
    reset(attribute: string | string[]): void;
    /**
     * @returns {*} The value of an attribute after applying its mutations.
     */
    mutated(attribute: string, value: any): any;
    /**
     * Mutates either specific attributes or all attributes if none provided.
     * @param {string|string[]|undefined} attribute
     */
    mutate(attribute?: string | string[]): void;
    /**
     * Sync the current attributes to the reference attributes. This is usually
     * only called on save. We have to clone the values otherwise we
     * end up with references to the same object in both attribute sets.
     *
     * You can also pass one or an array of attributes to sync.
     *
     * @param {string|string[]} attribute
     */
    sync(attribute?: string | string[]): void;
    /**
     * Registers an attribute on this model so that it can be accessed directly
     * on the model, passing through `get` and `set`.
     */
    registerAttribute(attribute: string): void;
    /**
     * Sets the value of an attribute and registers the magic "getter" in a way
     * that is compatible with Vue's reactivity. This method should always be
     * used when setting the value of an attribute.
     *
     * @param  {string|Object}  attribute
     * @param  {*}              value
     *
     * @returns {*} The value that was set.
     */
    set<T = any>(
      attribute: string | Record<string, any>,
      value?: T
    ): T | undefined;
    /**
     * Reverts all attributes back to their defaults, or `undefined` if a
     * default value is not defined.
     *
     * You can also pass one or an array of attributes to unset.
     *
     * @param {string|string[]} attribute
     */
    unset(attribute: string | string[]): void;
    /**
     * Similar to `saved`, returns an attribute's value or a fallback value
     * if this model doesn't have the attribute.
     *
     * @param {string} attribute
     * @param {*}      fallback
     *
     * @returns {*} The value of the attribute or `fallback` if not found.
     */
    get(attribute: string, fallback?: any): any;
    /**
     * Similar to `get`, but accesses the saved attributes instead.
     *
     * This is useful in cases where you want to display an attribute but also
     * change it. For example, a modal with a title based on a model field, but
     * you're also editing that field. The title will be updating reactively if
     * it's bound to the active attribute, so bind to the saved one instead.
     *
     * @param {string} attribute
     * @param {*}      fallback
     *
     * @returns {*} The value of the attribute or `fallback` if not found.
     */
    saved(attribute: string, fallback?: any): any;
    /**
     * Determines if the model has an attribute.
     *
     * @param  {string}  attribute
     * @returns {boolean} `true` if an attribute exists, `false` otherwise.
     *                   Will return true if the object exists but is undefined.
     */
    has(attribute: string): boolean;
    /**
     * @return {Array}
     */
    getValidateRules(attribute: string): Rule[];
    /**
     * Validates a specific attribute of this model, and sets errors for it.
     *
     * @returns {boolean} `true` if valid, `false` otherwise.
     */
    validateAttribute(
      attribute: string
    ): Promise<ValidationResultErrorFinalResult>;
    /**
     * Validates all attributes.
     *
     * @param {Object} [attributes] One or more attributes to validate.
     *
     * @returns {Promise}
     */
    validate(
      attributes?: string | string[]
    ): Promise<ValidationResultErrorFinalResult>;
    /**
     * @returns {Object} A native representation of this model that will determine
     *                   the contents of JSON.stringify(model).
     */
    toJSON(): Record<string, any>;
    /**
     * Adds this model to all registered collections.
     */
    addToAllCollections(): void;
    /**
     * Removes this model from all registered collections.
     */
    removeFromAllCollections(): void;
    /**
     * Returns an array of attribute names that have changed, or `false` if no
     * changes have been made since the last time this model was synced.
     *
     * @returns {Array|boolean} An array of changed attribute names, or `false`
     *                         if no attributes have changed since the last sync.
     */
    changed(): string[] | false;
    /**
     * Called when a fetch request was successful.
     */
    onFetchSuccess(response: Response): void;
    /**
     * Called when a fetch request failed.
     *
     * @param {Error}  error
     */
    onFetchFailure(error: any): void;
    /**
     * @returns {string} The key to use when generating the `patch` URL.
     */
    getPatchRoute(): Method;
    /**
     * @returns {string} The key to use when generating the `create` URL.
     */
    getCreateRoute(): Method;
    /**
     * @returns {string} The key to use when generating the `update` URL.
     */
    getUpdateRoute(): Method;
    /**
     * @returns {string} The method to use when making an update request.
     */
    getUpdateMethod(): Method;
    /**
     * @returns {string} The method to use when making an save request.
     */
    getSaveMethod(): Method;
    /**
     * @inheritDoc
     */
    getSaveRoute(): Method;
    /**
     * Returns whether this model should perform a "patch" on update, which will
     * only send changed data in the request, rather than all attributes.
     *
     * @returns {boolean} Whether this model should perform a "patch" on update,
     *                    which will only send changed data in the request,
     *                    rather than all attributes.
     */
    shouldPatch(): boolean;
    /**
     * @returns {Object} The data to send to the server when saving this model.
     */
    getSaveData(): Record<string, any>;
    /**
     * @returns {*} A potential identifier parsed from response data.
     */
    parseIdentifier(data: any): any;
    /**
     * @returns {boolean} Whether the given identifier is considered a valid
     *                   identifier value for this model.
     */
    isValidIdentifier(identifier: any): boolean;
    /**
     * @returns {boolean} Whether this model allows an existing identifier to be
     *                    overwritten on update.
     */
    shouldAllowIdentifierOverwrite(): boolean;
    /**
     * Updates the model data with data returned from the server.
     *
     * @param {Object} response
     */
    update(data: Record<string, any>): void;
    /**
     * Sets errors for a specific attribute. Support the ability to clear error
     * by passing an empty value.
     *
     * @param {string}       attribute
     * @param {string|array} errors
     */
    setAttributeErrors(
      attribute: string,
      errors?: string | string[] | ValidationResultError[]
    ): void;
    /**
     * Sets the errors on this model.
     *
     * @param {Object} errors
     */
    setErrors(errors?: Record<string, string | string[]>): void;
    /**
     * @returns {Object} Validation errors on this model.
     */
    getErrors(): Record<string, string | string[]>;
    /**
     * Clears all errors on this model.
     */
    clearErrors(): void;
    /**
     * Called when a save request was successful.
     *
     * @param {Object|null} response
     */
    onSaveSuccess(response: ProxyResponse): void;
    /**
     * Called when a save request resulted in a validation error.
     *
     * @param {Object} errors
     */
    onSaveValidationFailure(error: ResponseError): void;
    /**
     * Called when a save request resulted in an unexpected error,
     * eg. an internal server error (500)
     *
     * @param {Error}  error
     * @param {Object} response
     */
    onFatalSaveFailure(error: any, response: Response | undefined): void;
    /**
     * Called when a save request resulted in a general error.
     *
     * @param {Error}  error
     * @param {Object} response
     */
    onSaveFailure(error: any, response: Response | undefined): void;
    /**
     * Called when a delete request was successful.
     */
    onDeleteSuccess(response: Response): void;
    /**
     * Called when a delete request resulted in a general error.
     *
     * @param {Error}  error
     */
    onDeleteFailure(error: any): void;
    /**
     * Called before a fetch request is made.
     *
     * @returns {boolean|undefined} `false` if the request should not be made.
     */
    onFetch(): Promise<RequestOperation>;
    /**
     * @returns {boolean} whether this model is not persisted yet, ie. has not
     *                    been created yet. The default test is to check if the
     *                    model's identifier is missing.
     */
    isNew(): boolean;
    /**
     * @returns {boolean} the opposite of `isNew`, returns `true` if this model
     *                    is already persisted somewhere else.
     */
    isExisting(): boolean;
    /**
     * Called before a save request is made.
     *
     * @returns {boolean} `false` if the request should not be made.
     */
    onSave(): Promise<RequestOperation>;
    /**
     * Called before a delete request is made.
     *
     * @returns {boolean} `false` if the request should not be made.
     */
    onDelete(): Promise<RequestOperation>;
  }

  export interface ModelOptions extends Options {
    [key: string]: any;
    methods?: {
      [key: string]: HttpMethods;
    };
    /**
     * The attribute that should be used to uniquely identify this model.
     */
    identifier?: string;
    /**
     * Whether this model should allow an existing identifier to be
     * overwritten on update.
     */
    overwriteIdentifier?: boolean;
    /**
     * Route parameter matching pattern.
     */
    routeParameterPattern?: RegExp;
    /**
     * Whether this model should perform a "patch" on update,
     * which will only send changed attributes in the request.
     */
    patch?: boolean;
    /**
     * Whether this model should save even if no attributes have changed
     * since the last time they were synced. If set to `false` and no
     * changes have been made, the request will be considered a success.
     */
    saveUnchanged?: boolean;
    /**
     * Whether this model should only use the first validation error it
     * receives, rather than an array of errors.
     */
    useFirstErrorOnly?: boolean;
    /**
     * Whether this model should validate an attribute that has changed.
     * This would only affect the errors of the changed attribute and
     * will only be applied if the value is not a blank string.
     */
    validateOnChange?: boolean;
    /**
     * Whether this model should be validated before it is saved. This
     * will cause the request to fail if validation does not pass. This
     * is useful when you only want to validate on demand.
     */
    validateOnSave?: boolean;
    /**
     * Whether this model should validate models and collections within
     * its attribute tree. The result is implicit recursion as each of
     * those instances will also validate their trees, etc.
     */
    validateRecursively?: boolean;
    /**
     * Whether this model should mutate a property as it is changed,
     * before it is set. This is a rare requirement because you usually
     * don't  want to mutate something that you are busy editing.
     */
    mutateOnChange?: boolean;
    /**
     * Whether this model should mutate all attributes before they are
     * synced to the "saved" state. This would include construction,
     * on fetch, on save, and on assign.
     */
    mutateBeforeSync?: boolean;
    /**
     * Whether this model should use mutated values for the attributes
     * in "save" request. This will not mutate the active state.
     */
    mutateBeforeSave?: boolean;
  }
  export declare type Mutation = (value: any) => any;
  export declare type ValidationTask =
    | true
    | string
    | Promise<ValidationResult>;
  export declare type ValidationResult =
    | true
    | string
    | AttributesValidationErrors
    | (string | AttributesValidationErrors)[];
  export declare type ValidationResultError =
    | string
    | AttributesValidationErrors;
  export declare type ValidationResultErrorFinalResult =
    | ValidationResultError
    | ValidationResultError[];
  export interface AttributesValidationErrors {
    [key: string]: ValidationResultErrorFinalResult;
  }

  // Utils
  /**
   * Binds all methods of a class instance to itself.
   */
  export declare const autobind: (instance: any) => void;
}

declare module "vue-mc/validation" {
  import { Model } from "vue-mc";

  /**
   * Afrikaans
   */
  export declare const af_za: Bundle;
  /**
   * Arabic - Republic of Iraq
   */
  export declare const ar_iq: Bundle;
  /**
   * English - United States (Default)
   */
  export declare const en_us: Bundle;
  /**
   * Persian - Islamic Republic of Iran
   */
  export declare const fa_ir: Bundle;
  /**
   * French
   */
  export declare const fr_fr: Bundle;
  /**
   * Portuguese - Brazil
   */
  export declare const pt_br: Bundle;
  /**
   * Dutch - The Netherlands
   */
  export declare const nl_nl: Bundle;
  /**
   * Polish - Poland
   */
  export declare const pl_pl: Bundle;
  /**
   * Russian - Russia
   */
  export declare const ru_ru: Bundle;
  /**
   * Danish - Denmark
   */
  export declare const da_dk: Bundle;
  /**
   * Indonesian - Indonesia
   */
  export declare const id_id: Bundle;
  /**
   * German - Germany
   */
  export declare const de_de: Bundle;
  export interface Bundle {
    locale: string;
    messages: Messages;
  }
  export interface Messages {
    [key: string]: string;
    after: string;
    alpha: string;
    alphanumeric: string;
    array: string;
    ascii: string;
    base64: string;
    before: string;
    between: string;
    between_inclusive: string;
    boolean: string;
    creditcard: string;
    date: string;
    dateformat: string;
    defined: string;
    email: string;
    empty: string;
    equals: string;
    gt: string;
    gte: string;
    integer: string;
    ip: string;
    isblank: string;
    isnil: string;
    isnull: string;
    iso8601: string;
    json: string;
    length: string;
    length_between: string;
    lt: string;
    lte: string;
    match: string;
    negative: string;
    not: string;
    number: string;
    numeric: string;
    object: string;
    positive: string;
    required: string;
    same: string;
    string: string;
    url: string;
    uuid: string;
  }

  export declare class GlobalMessages {
    $locale: string;
    $fallback: string;
    $locales: Record<string, Bundle>;
    constructor();
    /**
     * Resets everything to the default configuration.
     */
    reset(): void;
    /**
     * Sets the active locale.
     *
     * @param {string} locale
     */
    locale(locale: string): void;
    /**
     * Registers a language pack.
     */
    register(bundle: Bundle): void;
    /**
     * Replaces or adds a new message for a given name and optional locale.
     *
     * @param {string} name
     * @param {string} format
     * @param {string} locale
     */
    set(name: string, format: string, locale: string): void;
    /**
     * Returns a formatted string for a given message name and context data.
     *
     * @param {string} name
     * @param {Object} data
     *
     * @returns {string} The formatted message.
     */
    get(name: string, data?: Record<string, any>): string;
  }
  /**
   * Global validation message registry.
   */
  export declare const messages: GlobalMessages;
  /**
   * Rule helpers for easy validation.
   * These can all be used directly in a model's validation configuration.
   *
   * @example
   *
   * import {ascii, length} from 'vue-mc/validation'
   *
   * class User extends Model {
   *     validation() {
   *         return {
   *             password: ascii.and(length(6)),
   *         }
   *     }
   * }
   */
  /**
   * Creates a new validation rule.
   *
   * Rules returned by this function can be chained with `or` and `and`.
   * For example: `ruleA.or(ruleB.and(RuleC)).and(RuleD)`
   *
   * The error message can be set or replaced using `format(message|template)`.
   *
   * @param {Object} config:
   *     - name: Name of the error message.
   *     - data: Context for the error message.
   *     - test: Function accepting (value, model), which should
   *             return `true` if the value is valid.
   *
   * @returns {Function} Validation rule.
   */
  export declare const rule: RuleFunction;
  /**
   * AVAILABLE RULES
   */
  /**
   * Checks if the value is after a given date string or `Date` object.
   */
  export declare const after: (date: Date) => Rule;
  /**
   * Checks if a value only has letters.
   */
  export declare const alpha: Rule;
  /**
   * Checks if a value only has letters or numbers.
   */
  export declare const alphanumeric: Rule;
  /**
   * Checks if a value is an array.
   */
  export declare const array: Rule;
  /**
   * Checks if a value is a string consisting only of ASCII characters.
   */
  export declare const ascii: Rule;
  /**
   * Checks if a value is a valid Base64 string.
   */
  export declare const base64: Rule;
  /**
   * Checks if a value is before a given date string or `Date` object.
   */
  export declare const before: (date: Date) => Rule;
  /**
   * Checks if a value is between a given minimum or maximum, inclusive by default.
   */
  export declare const between: RuleFunction;
  /**
   * Checks if a value is a boolean (strictly true or false).
   */
  export declare const boolean: Rule;
  /**
   * Checks if a value is a valid credit card number.
   */
  export declare const creditcard: Rule;
  /**
   * Checks if a value is parseable as a date.
   */
  export declare const date: Rule;
  /**
   * Checks if a value matches the given date format.
   *
   * @see https://date-fns.org/v2.0.0-alpha.9/docs/format
   */
  export declare const dateformat: RuleFunction;
  /**
   * Checks if a value is not `undefined`
   */
  export declare const defined: Rule;
  /**
   * Checks if a value is a valid email address.
   */
  export declare const email: Rule;
  /**
   * Checks if value is considered empty.
   *
   * @see https://lodash.com/docs/#isEmpty
   */
  export declare const empty: Rule;
  /**
   * Checks if a value equals the given value.
   */
  export declare const equals: RuleFunction;
  /**
   * Alias for `equals`
   */
  export declare const equal: RuleFunction;
  /**
   * Checks if a value is greater than a given minimum.
   */
  export declare const gt: RuleFunction;
  /**
   * Checks if a value is greater than or equal to a given minimum.
   */
  export declare const gte: RuleFunction;
  /**
   * Checks if a value is an integer.
   */
  export declare const integer: Rule;
  /**
   * Checks if a value is a valid IP address.
   */
  export declare const ip: Rule;
  /**
   * Checks if a value is a zero-length string.
   */
  export declare const isblank: Rule;
  /**
   * Checks if a value is `null` or `undefined`.
   */
  export declare const isnil: Rule;
  /**
   * Checks if a value is `null`.
   */
  export declare const isnull: Rule;
  /**
   * Checks if a value is a valid ISO8601 date string.
   */
  export declare const iso8601: Rule;
  /**
   * Checks if a value is valid JSON.
   */
  export declare const json: Rule;
  /**
   * Checks if a value's length is at least a given minimum, and no more than an
   * optional maximum.
   *
   * @see https://lodash.com/docs/#toLength
   */
  export declare const length: RuleFunction;
  /**
   * Checks if a value is less than a given maximum.
   */
  export declare const lt: RuleFunction;
  /**
   * Checks if a value is less than or equal to a given maximum.
   */
  export declare const lte: RuleFunction;
  /**
   * Checks if a value matches a given regular expression string or RegExp.
   */
  export declare const match: RuleFunction;
  /**
   * Alias for `lte`.
   */
  export declare const max: RuleFunction;
  /**
   * Alias for `gte`.
   */
  export declare const min: RuleFunction;
  /**
   * Checks if a value is negative.
   */
  export declare const negative: Rule;
  /**
   *
   */
  export declare const not: RuleFunction;
  /**
   * Checks if a value is a number (integer or float), excluding `NaN`.
   */
  export declare const number: Rule;
  /**
   * Checks if a value is a number or numeric string, excluding `NaN`.
   */
  export declare const numeric: Rule;
  /**
   * Checks if a value is an object, excluding arrays and functions.
   */
  export declare const object: Rule;
  /**
   * Checks if a value is positive.
   */
  export declare const positive: Rule;
  /**
   * Checks if a value is present, ie. not `null`, `undefined`, or a blank string.
   */
  export declare const required: Rule;
  /**
   * Checks if a value equals another attribute's value.
   */
  export declare const same: RuleFunction;
  /**
   * Checks if a value is a string.
   */
  export declare const string: Rule;
  /**
   * Checks if a value is a valid URL string.
   */
  export declare const url: Rule;
  /**
   * Checks if a value is a valid UUID.
   */
  export declare const uuid: Rule;
  declare global {
    interface Window {
      __vuemc_validation_messages: GlobalMessages;
    }
    namespace NodeJS {
      interface Global {
        __vuemc_validation_messages: GlobalMessages;
      }
    }
  }
  export interface Rule {
    (value: any, attribute?: string, model?: Model): true | string;
    _and: Rule[];
    _or: Rule[];
    _format: string | _.TemplateExecutor | null;
    copy(): Rule;
    format(format: string | _.TemplateExecutor): Rule;
    and(rule: Rule | Rule[]): Rule;
    or(rule: Rule | Rule[]): Rule;
  }
  export declare type RuleFunction = (...params: any[]) => Rule;
}

declare module "@planetadeleste/vue-mc-shopaholic" {
  import { VuexModule } from "vuex-module-decorators";
  import { AxiosStatic, AxiosRequestConfig } from "axios";
  import {
    ApiLinksResponse,
    ApiMetaResponse,
  } from "@bit/planetadeleste.shopaholic.types.api";
  import {
    Collection as BaseCollection,
    Model as BaseModel,
    RequestOptions,
    Response,
    RouteResolver,
  } from "vue-mc";

  type Constructor<T> = new (...args: any[]) => T;

  export class Base {
    static $resolve: RouteResolver;
    static $flashModule: VuexModule;
    static $loadingModule: VuexModule;
    static $authModule: VuexModule;
    static $http: AxiosStatic;

    get flashModule(): VuexModule;

    get loadingModule(): VuexModule;

    get authModule(): VuexModule;
  }

  export interface RelationConfig {
    class: Constructor<Model>;
    foreignKey?: string;
    localKey?: string;
    aliases?: string[];
  }

  export class Model extends BaseModel {
    private _accessors!: Record<string, Accessor>;
    private _relations!: Record<string, Constructor<Model>>;
    private _baseClass!: Base;
    private _silently!: boolean;
    private _base(): Base;

    boot(): void;

    get relations(): Record<string, Constructor<Model>>;

    silenty<T extends Model>(this: T, bEvent?: boolean): T;
    definedRelations(): Record<string, RelationConfig>;
    setRelation<T extends Model>(
      this: T,
      name: string,
      config: RelationConfig,
      relation: Record<string, any>
    ): T;
    getRelation(name: string): Constructor<Model>;
    registerRelation<T extends Model>(
      this: T,
      name: string,
      config: RelationConfig
    ): T;
    assignRelations(): void;

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
    isDirty(sKey?: string): boolean;

    /**
     *  @returns {Object} Attribute accessor keyed by attribute name.
     */
    accessors(): Record<string, Accessor | Accessor[]>;

    /**
     * Compiles all accessors into pipelines that can be executed quickly.
     */
    compileAccessors(): void;

    /**
     * Sync all accessors with model attributes
     */
    assignAccessors(): void;

    getRouteResolver(): RouteResolver;

    /**
     * Send an alert message to Flash store service
     *
     * @param {string} sMessage Alert Message
     * @param {string} sType Alert type (error, info, success)
     */
    alert(sMessage: string, sType = "error"): string;

    /**
     * @returns {Request} A new `Request` using the given configuration.
     */
    createRequest(config: AxiosRequestConfig): Request;

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
    ): Promise<Response>;

    /**
     * @returns {Object} The data to send to the server when saving this model.
     */
    getSaveData(): Record<string, any>;

    /**
     * Iterates over elements of data to find instanceof File
     *
     * @param {Object} data
     * @returns {Boolean}
     */
    private hasFileUpload(data: any): boolean;

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
    store(options: RequestOptions = {}): Promise<Response<any> | null>;
  }

  export class Collection<A extends Model = Model> extends BaseCollection<A> {
    _baseClass!: Base;
    _links: ApiLinksResponse | Record<string, any> = {};
    _meta: ApiMetaResponse | Record<string, any> = {};

    _base(): Base;
    boot(): void;
    getRouteResolver(): RouteResolver;

    /**
     * Send an alert message to Flash store service
     *
     * @param {string} sMessage Alert Message
     * @param {string} sType Alert type (error, info, success)
     */
    alert(sMessage: string, sType = "error"): string;

    /**
     * @returns {Request} A new `Request` using the given configuration.
     */
    createRequest(config: AxiosRequestConfig): Request;

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
    ): Promise<Response>;

    getModelsFromResponse(response: Response): any;

    /**
     * Get the current collection page, gived from server response
     * @returns {number}
     */
    getCurrentPage<T extends Collection>(this: T): number;

    /**
     * Get last collection page, gived from server response
     * @returns {number}
     */
    getLastPage<T extends Collection>(this: T): number;

    /**
     * Get total number of collection items from server
     * @returns {number}
     */
    getTotalItems<T extends Collection>(this: T): number;

    /**
     * Get pagination data
     * @returns {ApiMetaResponse}
     */
    getPaginationData<T extends Collection>(
      this: T
    ): ApiMetaResponse | Record<string, any>;

    /**
     * Get pagination links for first, last, next and prev page
     * @returns {ApiLinksResponse}
     */
    getLinks<T extends Collection>(
      this: T
    ): ApiLinksResponse | Record<string, any>;

    /**
     *
     * @param {Object} filters JSON object to add filters param
     * @returns {Collection}
     */
    filterBy<T extends Collection>(this: T, filters: Record<string, any>): T;

    /**
     * Limit number of records getting from query
     *
     * @param {Number} iCount Number of records to get
     */
    limit<T extends Collection>(this: T, iCount: number): T;

    /**
     * @returns {Record<string, any>} A native representation of this collection models that will determine the contents of JSON.stringify(model).
     */
    getModelList<T extends Collection>(this: T): Record<string, any>;
  }

  export type Accessor = (value?: any) => any;

  /**
   * Convert value to string and trim
   * @param {string} sVal
   * @returns {string}
   */
  export function cleanStr(sVal?: string): string | null;
}
