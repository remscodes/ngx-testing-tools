import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RequestMethod } from '../common/tools/http/utils/models/request-method.model';

export interface ExpectRequestConfig {
  url: string;
  method?: RequestMethod;
}

/** @deprecated Use `HttpTools` within custom test bed instead to access this utility. Will be removed in v3. */
export function expectHttpRequest(httpController: HttpTestingController, config: ExpectRequestConfig): TestRequest {
  const { url, method } = config;

  return httpController.expectOne({ url, method });
}
