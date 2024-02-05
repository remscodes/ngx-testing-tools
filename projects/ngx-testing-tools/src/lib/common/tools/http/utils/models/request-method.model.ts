export type RequestMethod =
  | NoBodyRequestMethod
  | BodyRequestMethod

export type NoBodyRequestMethod =
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'JSONP'

export type BodyRequestMethod =
  | 'POST'
  | 'PUT'
  | 'PATCH'
