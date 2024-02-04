import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { Unusable } from '../../shared.models';
import { HttpOptions } from './models/http-options.model';
import { HttpTools } from './models/http-tools.model';
import { emitFakeErrorResponse } from './utils/emit-error-response';
import { emitFakeSuccessResponse } from './utils/emit-success-response';

export function buildHttpTools(injector: Injector, options: HttpOptions): HttpTools {
  if (!options.httpTesting) return unusableHttpTools();

  const client = injector.get(HttpClient);
  const controller = injector.get(HttpTestingController);

  return {
    client,
    controller,
    emitSuccessResponse: (config) => emitFakeSuccessResponse(controller, config),
    emitErrorResponse: (config) => emitFakeErrorResponse(controller, config),
  };
}

function unusableHttpTools(): Unusable<HttpTools> {
  return {
    get client() {return throwDisabledHttpTesting('client');},
    get controller() {return throwDisabledHttpTesting('controller');},
    emitSuccessResponse: () => throwDisabledHttpTesting('emitSuccessResponse'),
    emitErrorResponse: () => throwDisabledHttpTesting('emitErrorResponse'),
  };
}

function throwDisabledHttpTesting(key: keyof HttpTools): never {
  throw new ReferenceError(`Cannot use \`http.${key}\` because HttpTools is not initialized. You need to set \`httpTesting:true\` into the test bed options.`);
}
