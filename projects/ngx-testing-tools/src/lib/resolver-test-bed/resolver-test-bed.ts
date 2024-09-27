import { Type } from '@angular/core';
import { Resolve, ResolveFn } from '@angular/router';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../common/test-beds/base/merge-base-factory';
import { ResolverTestBed, ResolverTestBedOptions } from './models';
import { ValidResolver } from './models/valid-resolver.model';
import { ResolverTestBedFactory } from './resolver-test-bed-factory';

/**
 * Creates a new `GuardTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootResolver - the described class resolver
 * @param options - check `ResolverTestBedOptions`
 */
export function resolverTestBed<T extends Resolve<any>>(rootResolver: Type<T>, options?: ResolverTestBedOptions): ResolverTestBed<T>
/**
 * Creates a new `GuardTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootResolver - the described function resolver
 * @param options - check `ResolverTestBedOptions`
 */
export function resolverTestBed<T extends ResolveFn<any>>(rootResolver: T, options: ResolverTestBedOptions): ResolverTestBed<T>
export function resolverTestBed<T>(rootResolver: ValidResolver<T>, options: ResolverTestBedOptions = {}): ResolverTestBed<T> {
  const factory = new ResolverTestBedFactory(rootResolver, options);

  const {
    httpTesting,
    verifyHttp: defaultVerifyHttp,
  } = factory['httpOptions'];

  const tb: ResolverTestBed<T> = ((assertion, opts = {}) => {
    const {
      verifyHttp = defaultVerifyHttp,
    } = opts;

    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      postTest: (tools) => {
        if (httpTesting && verifyHttp) tools.http.controller.verify();
        tools.rx['cleanAll']();
      },
    });
  }) as ResolverTestBed<T>;

  return mergeBaseFactory(factory, tb);
}

/**
 * Only invokes the "should create" test.
 *
 * To be used when there are no apparent or relevant tests to be performed on this resolver.
 *
 * The usage of this function and `resolverTestBed` function must be mutually exclusive.
 *
 * @param rootResolver - the described resolver
 * @param options
 */
export function itShouldCreateResolver<T extends Resolve<any>>(rootResolver: Type<T>, options?: ItShouldCreateGuardOptions): void
/**
 * Only invokes the "should create" test.
 *
 * To be used when there are no apparent or relevant tests to be performed on this resolver.
 *
 * The usage of this function and `resolverTestBed` function must be mutually exclusive.
 *
 * @param rootResolver - the described resolver
 * @param options
 */
export function itShouldCreateResolver<T extends ResolveFn<any>>(rootResolver: T, options?: ItShouldCreateGuardOptions): void
export function itShouldCreateResolver<T>(rootResolver: ValidResolver<T>, options?: ItShouldCreateGuardOptions): void {
  resolverTestBed(rootResolver as any, options);
}

type ItShouldCreateGuardOptions = Pick<ResolverTestBedOptions,
  | 'providers'
  | 'imports'
>
