import { RequestMethod } from './request-method.model';

export interface ExpectRequestConfig {
  url: string;
  method: RequestMethod;
}
