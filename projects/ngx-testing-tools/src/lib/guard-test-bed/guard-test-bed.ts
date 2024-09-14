import { Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../common/test-beds/base/merge-base-factory';
import { GuardTestBedFactory } from './guard-test-bed-factory';
import { GuardTestBed, GuardTestBedOptions } from './models';
import { GuardCan, GuardClass, GuardFn } from './models/guard-can.model';
import { ValidGuard } from './models/valid-guard.model';

/**
 * Creates a new `GuardTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootGuard - the described class guard
 * @param options - check `GuardTestBedOptions`
 */
export function guardTestBed<T extends GuardClass>(rootGuard: Type<T>, options?: GuardTestBedOptions): GuardTestBed<T>
/**
 * Creates a new `GuardTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootGuard - the described function guard
 * @param options - check `GuardTestBedOptions`
 */
export function guardTestBed<T extends GuardFn>(rootGuard: T, options: GuardTestBedOptions & { type: GuardCan }): GuardTestBed<T>
export function guardTestBed<T>(rootGuard: ValidGuard<T>, options: GuardTestBedOptions & { type?: GuardCan } = {}): GuardTestBed<T> {
  const factory = new GuardTestBedFactory(rootGuard, options);

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
