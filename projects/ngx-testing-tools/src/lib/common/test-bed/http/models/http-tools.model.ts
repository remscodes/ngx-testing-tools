import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { ErrorResponseConfig } from '../../../../http/models/error-response-config.model';
import { BodyType, SuccessResponseConfig } from '../../../../http/models/success-response-config.model';

export interface HttpTools {
  client: HttpClient;
  controller: HttpTestingController;

  emitSuccessResponse<T extends BodyType>(config: SuccessResponseConfig<T>): void;

  emitErrorResponse(config: ErrorResponseConfig): void;
}
