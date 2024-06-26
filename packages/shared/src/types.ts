import type { MimeType } from "@uploadthing/mime-types";

import type { AllowedFileType } from "./file-types";

export type JsonValue = string | number | boolean | null | undefined;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue | JsonObject | JsonArray };
export type Json = JsonValue | JsonObject | JsonArray;

export type Overwrite<T, U> = Omit<T, keyof U> & U;
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type ErrorMessage<TError extends string> = TError;
// eslint-disable-next-line @typescript-eslint/ban-types
export type Simplify<TType> = { [TKey in keyof TType]: TType[TKey] } & {};
export type MaybePromise<TType> = TType | Promise<TType>;
export type Either<TData, TError> =
  | { data: TData; error: null }
  | { data: null; error: TError };
export type ExtendObjectIf<Predicate, ToAdd> = undefined extends Predicate
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : ToAdd;

/**
 * A subset of the standard RequestInit properties needed by UploadThing internally.
 * @see RequestInit from lib.dom.d.ts
 */
export interface RequestInitEsque {
  /**
   * Sets the request's body.
   */
  body?: FormData | ReadableStream | string | null;

  /**
   * Sets the request's associated headers.
   */
  headers?: [string, string][] | Record<string, string>;

  /**
   * The request's HTTP-style method.
   */
  method?: string;
}

/**
 * A subset of the standard Response properties needed by UploadThing internally.
 * @see Response from lib.dom.d.ts
 */
export interface ResponseEsque {
  status: number;
  statusText: string;
  ok: boolean;
  /**
   * @remarks
   * The built-in Response::json() method returns Promise<any>, but
   * that's not as type-safe as unknown. We use unknown because we're
   * more type-safe. You do want more type safety, right? 😉
   */
  json: <T = unknown>() => Promise<T>;
  text: () => Promise<string>;
  blob: () => Promise<Blob>;

  headers: Headers;

  clone: () => ResponseEsque;
}

export type MaybeUrl = string | URL;

/**
 * A subset of the standard fetch function type needed by UploadThing internally.
 * @see fetch from lib.dom.d.ts
 */
export type FetchEsque = (
  input: RequestInfo | MaybeUrl,
  init?: RequestInit | RequestInitEsque,
) => Promise<ResponseEsque>;

type PowOf2 = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024;
export type SizeUnit = "B" | "KB" | "MB" | "GB";
export type FileSize = `${PowOf2}${SizeUnit}`;

export type TimeShort = "s" | "m" | "h" | "d";
export type TimeLong = "second" | "minute" | "hour" | "day";
type SuggestedNumbers = 2 | 3 | 4 | 5 | 6 | 7 | 10 | 15 | 30 | 60;
// eslint-disable-next-line @typescript-eslint/ban-types
type AutoCompleteableNumber = SuggestedNumbers | (number & {});
export type Time =
  | number
  | `1${TimeShort}`
  | `${AutoCompleteableNumber}${TimeShort}`
  | `1 ${TimeLong}`
  | `${AutoCompleteableNumber} ${TimeLong}s`;

export const ValidContentDispositions = ["inline", "attachment"] as const;
export type ContentDisposition = (typeof ValidContentDispositions)[number];

export const ValidACLs = ["public-read", "private"] as const;
export type ACL = (typeof ValidACLs)[number];

type RouteConfig = {
  maxFileSize: FileSize;
  maxFileCount: number;
  minFileCount: number; // must be <= maxFileCount
  contentDisposition: ContentDisposition;
  acl?: ACL; // default is set on UT server, not backfilled like other options
};

export type FileRouterInputKey = AllowedFileType | MimeType;

export type ExpandedRouteConfig = {
  [key in FileRouterInputKey]?: RouteConfig;
};

export type EndpointMetadata = {
  slug: string;
  config: ExpandedRouteConfig;
}[];

type PartialRouteConfig = Partial<
  Record<FileRouterInputKey, Partial<RouteConfig>>
>;

export type FileRouterInputConfig = FileRouterInputKey[] | PartialRouteConfig;
