import { HttpTestingController } from '@angular/common/http/testing';
import { BodyType, SuccessResponseConfig } from './models/success-response-config.model';

export function emitFakeSuccessResponse<T extends BodyType>(httpController: HttpTestingController, config: SuccessResponseConfig<T>): void {
  const { url, method, body, status, headers, statusText } = config;

  httpController
    .expectOne({ url, method })
    .flush(body, { status, headers, statusText });
}
