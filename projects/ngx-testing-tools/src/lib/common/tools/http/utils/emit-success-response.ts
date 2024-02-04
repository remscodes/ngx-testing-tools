import { HttpTestingController } from '@angular/common/http/testing';
import { BodyType, SuccessResponseConfig } from './models/success-response-config.model';

/** @deprecated Use `HttpTools` within custom test bed instead to access this utility. Will be removed in v3. */
export function emitFakeSuccessResponse<T extends BodyType>(httpController: HttpTestingController, config: SuccessResponseConfig<T>): void {
  const { url, method, body, status, headers, statusText } = config;

  httpController
    .expectOne({ url, method })
    .flush(body, { status, headers, statusText });
}
