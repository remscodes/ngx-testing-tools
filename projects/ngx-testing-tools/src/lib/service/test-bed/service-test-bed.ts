import { Type } from '@angular/core';
import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { buildJasmineCallback } from '../../common/test-bed/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../../common/test-bed/merge-factory/merge-base-factory';
import { ServiceTestBed, ServiceTestBedOptions } from './models';
import { ServiceCallback } from './models/service-callback.model';
import { ServiceExtraOptions } from './models/service-extra-options.model';
import { ServiceTestBedFactory } from './service-test-bed-factory';
import { buildServiceTools } from './service-tools';

/**
 * Creates a new `ServiceTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootService - The described Service.
 * @param options
 */
export function serviceTestBed<T>(rootService: Type<T>, options: ServiceTestBedOptions = {}): ServiceTestBed<T> {
  const {
    httpTesting = false,
    verifyHttp: globalVerifyHttp,
  } = options;

  const httpOptions: HttpOptions = { httpTesting };

  const factory = new ServiceTestBedFactory(rootService, options);

  const tb: ServiceTestBed<T> = ((assertion: ServiceCallback<T, any>, opts: ServiceExtraOptions = {}) => {
    const { verifyHttp = globalVerifyHttp ?? true } = opts;

    return buildJasmineCallback({
      callback: assertion,
      deferredTools: () => buildServiceTools(factory, httpOptions),
      postTest: (tools) => {
        if (httpTesting && verifyHttp) tools.http.controller.verify();
        tools.rx['cleanAll']();
      },
    });
  }) as ServiceTestBed<T>;

  return mergeBaseFactory(factory, tb) as ServiceTestBed<T>;
}
