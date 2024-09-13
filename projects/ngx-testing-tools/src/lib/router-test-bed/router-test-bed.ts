import { Routes } from '@angular/router';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../common/test-beds/base/merge-base-factory';
import { RouterTestBed, RouterTestBedOptions } from './models';
import { RouterTestBedFactory } from './router-test-bed-factory';

/**
 * Creates a new `RouterTestBed` to configure the custom test bed and wrap the assertion test.
 * @param routes
 * @param options
 */
export function routerTestBed<T extends Routes>(routes: T, options: RouterTestBedOptions = {}): RouterTestBed<T> {
  const factory = new RouterTestBedFactory(routes);
  const { startDetectChanges } = options;

  const tb: RouterTestBed<T> = ((assertion) => {
    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      preTest: (tools) => {
        if (!startDetectChanges) tools.harness.detectChanges();
      },
      postTest: (tools) => {
        tools.rx['cleanAll']();
      },
    });
  }) as RouterTestBed<T>;

  return mergeBaseFactory(factory, tb);
}
