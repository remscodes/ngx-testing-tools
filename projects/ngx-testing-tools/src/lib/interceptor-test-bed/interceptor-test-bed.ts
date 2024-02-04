import { HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';
import { Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../common/test-beds/base/merge-base-factory';
import { InterceptorTestBedFactory } from './interceptor-test-bed-factory';
import { InterceptorTestBed, InterceptorTestBedOptions } from './models';

/**
 * Creates a new `InterceptorTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootInterceptor - The described Interceptor.
 * @param options
 */
export function interceptorTestBed<T extends HttpInterceptor>(rootInterceptor: Type<T> | HttpInterceptorFn, options: InterceptorTestBedOptions = {}) {
  const {
    verifyHttp: globalVerifyHttp,
  } = options;

  const factory = new InterceptorTestBedFactory(rootInterceptor, options);

  const tb: InterceptorTestBed<T> = ((assertion, opts = {}) => {
    const { verifyHttp = globalVerifyHttp ?? true } = opts;

    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      postTest: (tools) => {
        if (verifyHttp) tools.http.controller.verify();
        tools.rx['cleanAll']();
      },
    });
  }) as InterceptorTestBed<T>;

  return mergeBaseFactory(factory, tb) as InterceptorTestBed<T>;
}
