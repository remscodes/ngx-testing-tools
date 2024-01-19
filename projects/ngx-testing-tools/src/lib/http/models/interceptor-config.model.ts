import { RequestMethod } from './request-method.model';

export interface SuccessInterceptorConfig {
  url: string;
  method?: RequestMethod;
}

export interface ErrorInterceptorConfig {
  url?: string;
  status?: number;
}
