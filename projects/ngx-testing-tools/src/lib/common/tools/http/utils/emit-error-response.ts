import { HttpTestingController } from '@angular/common/http/testing';
import { ErrorResponseConfig } from './models/error-response-config.model';

/** @deprecated Use `HttpTools` within custom test bed instead to access this utility. Will be removed in v3. */
export function emitFakeErrorResponse(httpController: HttpTestingController, config: ErrorResponseConfig): void {
  const { url, method, status, statusText = 'Error' } = config;
  const error = new ProgressEvent(statusText);

  httpController
    .expectOne({ url, method })
    .error(error, { status, statusText });
}
