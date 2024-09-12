import { HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';
import { Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../common/test-beds/base/merge-base-factory';
import { InterceptorTestBedFactory } from './interceptor-test-bed-factory';
import { InterceptorTestBed, InterceptorTestBedOptions } from './models';

/**
 * Creates a new `InterceptorTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootInterceptor - The described HttpInterceptor.
 * @param options
 */
export function interceptorTestBed<T extends HttpInterceptor>(rootInterceptor: Type<T>, options?: InterceptorTestBedOptions): InterceptorTestBed<T>
/**
 * Creates a new `InterceptorTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootInterceptor - The described HttpInterceptorFn.
 * @param options
 */
export function interceptorTestBed(rootInterceptor: HttpInterceptorFn, options?: InterceptorTestBedOptions): InterceptorTestBed<HttpInterceptorFn>
export function interceptorTestBed<T extends HttpInterceptor>(rootInterceptor: Type<T> | HttpInterceptorFn, options: InterceptorTestBedOptions = {}): InterceptorTestBed<T | HttpInterceptorFn> {
  const {
    verifyHttp: globalVerifyHttp,
  } = options;

  const factory = new InterceptorTestBedFactory(rootInterceptor, options);

  const tb: InterceptorTestBed<T | HttpInterceptorFn> = ((assertion, opts = {}) => {
    const { verifyHttp = globalVerifyHttp ?? true } = opts;

    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      postTest: (tools) => {
        if (verifyHttp) tools.http.controller.verify();
        tools.rx['cleanAll']();
      },
    });
  }) as InterceptorTestBed<T | HttpInterceptorFn>;

  return mergeBaseFactory(factory, tb as any);
}

/**
 * Only invokes the "should create" test.
 *
 * To be used when there are no apparent or consistent tests to be performed on this interceptor.
 *
 * The usage of this function and `interceptorTestBed` function must be mutually exclusive.
 *
 * @param rootInterceptor - The described HttpInterceptor.
 * @param options
 */
export function itShouldCreateInterceptor<T extends HttpInterceptor>(rootInterceptor: Type<T>, options?: ItShouldCreateOptions): void
/**
 * Only invokes the "should create" test.
 *
 * To be used when there are no apparent or consistent tests to be performed on this interceptor.
 *
 * The usage of this function and `interceptorTestBed` function must be mutually exclusive.
 *
 * @param rootInterceptor - The described HttpInterceptorFn.
 * @param options
 */
export function itShouldCreateInterceptor(rootInterceptor: HttpInterceptorFn, options?: ItShouldCreateOptions): void
export function itShouldCreateInterceptor<T extends HttpInterceptor>(rootInterceptor: Type<T> | HttpInterceptorFn, options: ItShouldCreateOptions = {}): void {
  interceptorTestBed(rootInterceptor as any, options);
}

type ItShouldCreateOptions = Pick<InterceptorTestBedOptions,
  | 'providers'
  | 'imports'
>
