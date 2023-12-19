import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from './request-method.model';

export interface SuccessResponseConfig<T extends BodyType> {
  url: string;
  method: RequestMethod;
  headers?: HeadersType;
  status?: number;
  statusText?: string;
  body: T;
}

export type BodyType =
  | ArrayBuffer
  | Blob
  | boolean
  | string
  | number
  | Object
  | (boolean | string | number | Object | null)[]
  | null

type HeadersType =
  | HttpHeaders
  | { [name: string]: string | string[] }
