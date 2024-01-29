import { RequestMethod } from './request-method.model';

export interface ErrorResponseConfig {
  url: string;
  method?: RequestMethod;
  status?: number;
  statusText?: string;
}
