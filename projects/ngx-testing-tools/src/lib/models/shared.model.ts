export type Nullable<T> =
  | T
  | null

export type MaybeArray<T> =
  | T
  | T[]

export type NonEmptyString<T extends string> = T extends '' ? never : T;

export type Merge<T> = {
  [K in keyof T]: T[K];
} & {};

