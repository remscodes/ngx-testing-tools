import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { ErrorResponseConfig } from '../../../../http/models/error-response-config.model';
import { BodyType, SuccessResponseConfig } from '../../../../http/models/success-response-config.model';

export interface HttpTools {
  /**
   * @see HttpClient
   */
  client: HttpClient;
  /**
   * @see HttpTestingController
   */
  controller: HttpTestingController;

  /**
   * Fakes a http success response for the request that matches the url.
   */
  emitSuccessResponse<T extends BodyType>(config: SuccessResponseConfig<T>): void;

  /**
   * Fakes a http error response for the request that matches the url.
   */
  emitErrorResponse(config: ErrorResponseConfig): void;
}
