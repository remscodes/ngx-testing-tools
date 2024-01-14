import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ErrorResponseConfig } from './models/error-response-config.model';
import { ExpectRequestConfig } from './models/request-config.model';
import { BodyType, SuccessResponseConfig } from './models/success-response-config.model';

export function emitFakeSuccessResponse<T extends BodyType>(httpController: HttpTestingController, config: SuccessResponseConfig<T>): void {
  httpController
    .expectOne({ url: config.url, method: config.method })
    .flush(config.body as any, { status: config.status, headers: config.headers, statusText: config.statusText });
}

export function emitFakeErrorResponse(httpController: HttpTestingController, config: ErrorResponseConfig): void {
  const error: ProgressEvent = new ProgressEvent(config.statusText ?? 'Error');
  httpController
    .expectOne({ url: config.url, method: config.method })
    .error(error, {
      status: config.status,
      statusText: config.statusText,
    });
}

export function expectHttpRequest(httpController: HttpTestingController, config: ExpectRequestConfig): TestRequest {
  return httpController
    .expectOne({ url: config.url, method: config.method });
}
