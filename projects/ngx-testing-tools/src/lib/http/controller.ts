import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ErrorResponseConfig } from './models/error-response-config.model';
import { ExpectRequestConfig } from './models/request-config.model';
import { BodyType, SuccessResponseConfig } from './models/success-response-config.model';

export function emitFakeSuccessResponse<T extends BodyType>(httpController: HttpTestingController, config: SuccessResponseConfig<T>): void {
  const { url, method, body, status, headers, statusText } = config;

  httpController
    .expectOne({ url, method })
    .flush(body, { status, headers, statusText });
}

export function emitFakeErrorResponse(httpController: HttpTestingController, config: ErrorResponseConfig): void {
  const { url, method, status, statusText = 'Error' } = config;
  const error = new ProgressEvent(statusText);

  httpController
    .expectOne({ url, method })
    .error(error, { status, statusText });
}

export function expectHttpRequest(httpController: HttpTestingController, config: ExpectRequestConfig): TestRequest {
  const { url, method } = config;

  return httpController.expectOne({ url, method });
}
