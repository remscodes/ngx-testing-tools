import { Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../common/test-beds/base/merge-base-factory';
import { ServiceTestBed, ServiceTestBedOptions } from './models';
import { ServiceTestBedFactory } from './service-test-bed-factory';

/**
 * Creates a new `ServiceTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootService - The described Service.
 * @param options
 */
export function serviceTestBed<T>(rootService: Type<T>, options: ServiceTestBedOptions = {}): ServiceTestBed<T> {
  const factory = new ServiceTestBedFactory(rootService, options);

  const {
    httpTesting,
    verifyHttp: defaultVerifyHttp,
  } = factory['httpOptions'];

  const tb: ServiceTestBed<T> = ((assertion, opts = {}) => {
    const { verifyHttp = defaultVerifyHttp } = opts;

    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      postTest: (tools) => {
        if (httpTesting && verifyHttp) tools.http.controller.verify();
        tools.rx['cleanAll']();
      },
    });
  }) as ServiceTestBed<T>;

  return mergeBaseFactory(factory, tb) as ServiceTestBed<T>;
}
