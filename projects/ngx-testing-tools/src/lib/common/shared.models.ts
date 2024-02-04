export type Nullable<T> =
  | T
  | null

export type MaybeArray<T> =
  | T
  | T[]

export type MaybePromise<T> =
  | T
  | PromiseLike<T>

export type NonEmptyString<T extends string> = T extends '' ? never : T;

export type PrettyMerge<T extends {}> = {
  [K in keyof T]: T[K];
} & {};

export type MethodsOf<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
}

export type Unusable<T> = {
  [K in keyof T]: T[K] extends Function ? () => never : never;
}

export type Deferred<T> = () => T
