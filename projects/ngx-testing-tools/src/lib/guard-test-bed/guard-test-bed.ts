import { Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../common/test-beds/base/merge-base-factory';
import { GuardTestBedFactory } from './guard-test-bed-factory';
import { GuardTestBed, GuardTestBedOptions } from './models';
import { GuardCan, GuardCanFn } from './models/guard-can.model';

/**
 * Creates a new `GuardTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootGuard
 * @param options
 */
export function guardTestBed<T extends GuardCan>(rootGuard: Type<T>, options?: GuardTestBedOptions): GuardTestBed<T>
/**
 * Creates a new `GuardTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootGuard
 * @param can
 * @param options
 */
export function guardTestBed<T extends GuardCanFn>(rootGuard: T, can: '', options?: GuardTestBedOptions): GuardTestBed<T>
export function guardTestBed<T>(rootGuard: ValidGuard<T>, canOrOptions: undefined, options: GuardTestBedOptions = {}): GuardTestBed<T> {
  const factory = new GuardTestBedFactory<any>(rootGuard as any, options);

  const {
    httpTesting,
    verifyHttp: defaultVerifyHttp,
  } = factory['httpOptions'];

  const tb: GuardTestBed<T> = ((assertion, opts = {}) => {
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
  }) as GuardTestBed<T>;

  return mergeBaseFactory(factory, tb);
}

type ValidGuard<T> =
  T extends GuardCan ? Type<T>
    : T extends GuardCanFn ? T
      : never
