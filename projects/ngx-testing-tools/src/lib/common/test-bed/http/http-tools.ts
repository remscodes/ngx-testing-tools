import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { emitFakeErrorResponse, emitFakeSuccessResponse } from '../../../http';
import { HttpTools } from './models/http-tools.model';

export function buildHttpTools(injector: Injector): HttpTools {
  const client = injector.get(HttpClient);
  const controller = injector.get(HttpTestingController);

  return {
    client,
    controller,
    emitSuccessResponse: (config) => emitFakeSuccessResponse(controller, config),
    emitErrorResponse: (config) => emitFakeErrorResponse(controller, config),
  };
}
