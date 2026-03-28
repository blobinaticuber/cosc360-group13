/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** The details used to register a new user. */
export interface RegistrationDetails {
  name: string;
  /** @format email */
  email: string;
  password: string;
  profilePicture?: string;
}

/** The public information about a user. */
export interface UserDetails {
  id: string;
  name: string;
  profilePicture: string;
}

/** The credentials used to log a user in. */
export interface UserCredentials {
  /** @format email */
  email: string;
  password: string;
}

/** Used to define a new listing. */
export interface ListingCreation {
  title: string;
  description: string;
  image?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:3000/";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title Booklend API
 * @version 0.0.1
 * @baseUrl http://localhost:3000/
 *
 * This Restful API is meant to serve as the back-end for the Booklend web app.
 *
 * The code can be found in [a public GitHub repository](https://github.com/blobinaticuber/cosc360-group13/tree/main/back-end).
 */
export class BooklendAPI<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * @description Register a new user.
     *
     * @tags User
     * @name UserCreate
     * @summary Register a new user
     * @request POST:/user
     */
    userCreate: (data: RegistrationDetails, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            type: "invalid body";
            expected?: any;
            received?: any;
          }
        | {
            type: "conflict";
            conflicts: Record<string, boolean>;
          }
      >({
        path: `/user`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get public information about a user.
     *
     * @tags User
     * @name UserList
     * @summary Get information about a user
     * @request GET:/user
     */
    userList: (
      query?: {
        id?: string;
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserDetails, void>({
        path: `/user`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete the user that is currently logged in.
     *
     * @tags User
     * @name UserDelete
     * @summary Delete the current user
     * @request DELETE:/user
     */
    userDelete: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Log in (create a session).
     *
     * @tags User
     * @name SessionCreate
     * @summary Log In
     * @request POST:/user/session
     */
    sessionCreate: (data: UserCredentials, params: RequestParams = {}) =>
      this.request<void, UserCredentials | void>({
        path: `/user/session`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Log out (delete a session).
     *
     * @tags User
     * @name SessionDelete
     * @summary Log Out
     * @request DELETE:/user/session
     */
    sessionDelete: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/session`,
        method: "DELETE",
        ...params,
      }),
  };
  listing = {
    /**
     * @description Create a new listing.
     *
     * @tags Listing
     * @name ListingCreate
     * @summary Create a listing
     * @request POST:/listing
     */
    listingCreate: (data: ListingCreation, params: RequestParams = {}) =>
      this.request<
        void,
        {
          type: "invalid body";
          expected?: any;
          received?: any;
        } | void
      >({
        path: `/listing`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get the details about a listing from its ID.
     *
     * @tags listing
     * @name ListingDetail
     * @summary Get the details of a listing
     * @request GET:/listing/{id}
     */
    listingDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          id: string;
          title: string;
          description: string;
          user: string;
          image: string;
        },
        void
      >({
        path: `/listing/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing listing.
     *
     * @tags Listing
     * @name ListingPartialUpdate
     * @summary Update a listing
     * @request PATCH:/listing/{id}
     */
    listingPartialUpdate: (
      id: string,
      data: ListingCreation,
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        {
          type: "invalid body";
          expected?: any;
          received?: any;
        } | void
      >({
        path: `/listing/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete the listing with the specified ID.
     *
     * @tags listing
     * @name ListingDelete
     * @summary Delete a listing
     * @request DELETE:/listing/{id}
     */
    listingDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/listing/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  search = {
    /**
     * @description Search for a book listing by its title. The response will include any listing where the title includes the {title} as a substring.
     *
     * @tags Listing, Search
     * @name ListingDetail
     * @summary Search for a listing by its title
     * @request GET:/search/listing/{title}
     */
    listingDetail: (
      title: string,
      query?: {
        /** @exclusiveMin 0 */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: string;
          title: string;
          description: string;
          user: string;
          image: string;
        }[],
        void
      >({
        path: `/search/listing/${title}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Search for a user by their name. The response will include any user whose name includes the {name} parameter as a substring.
     *
     * @tags User, Search
     * @name UserDetail
     * @summary Search for a user by their name
     * @request GET:/search/user/{name}
     */
    userDetail: (
      name: string,
      query?: {
        /** @exclusiveMin 0 */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserDetails[], void>({
        path: `/search/user/${name}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Searches for a book by its title, using the Google Books API to retrieve results. Results are limited to twenty matching books at a time. Use the `page` query to get more results (e.g., `page=1`, the default, will show the top 20 matches, `page=2` shows results 21-40, and so on).
     *
     * @tags Book, Search
     * @name BookDetail
     * @summary Search for a book by its title
     * @request GET:/search/book/{title}
     */
    bookDetail: (
      title: string,
      query?: {
        /** @exclusiveMin 0 */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** The ID of this book/volume in the Google Books database. */
          id: string;
          /** The authors of this book. */
          authors: string[];
          /**
           * The average rating (1 to 5) of this book on Google.
           * @min 1
           * @max 5
           */
          rating?: number;
          /** The categories of this booke, e.g. "Fiction", "Suspense". */
          categories: string[];
          /** An HTML string containing a description of the book. */
          description: string;
          /** A URL to an image of the book's cover. If Google's database doesn't have such an image, then this uses a default value. */
          image: string;
          /** The title (and subtitle, if there is one) of the book. The subtitle is separated from the title like "Title: Subtitle". */
          title: string;
        }[],
        void | {
          type: "server";
          message: string;
        }
      >({
        path: `/search/book/${title}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
