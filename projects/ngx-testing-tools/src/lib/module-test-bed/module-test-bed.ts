import { Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../common/test-beds/base/merge-base-factory';
import { ModuleTestBed, ModuleTestBedOptions } from './models';
import { ModuleTestBedFactory } from './module-test-bed-factory';

/**
 * Creates a new `ModuleTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootModule - The described Module.
 * @param options
 */
export function moduleTestBed<T>(rootModule: Type<T>, options: ModuleTestBedOptions = {}): ModuleTestBed<T> {
  const factory = new ModuleTestBedFactory(rootModule, options);

  const tb: ModuleTestBed<T> = ((assertion) => {
    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      postTest: (tools) => {
        tools.rx['cleanAll']();
      },
    });
  }) as ModuleTestBed<T>;

  return mergeBaseFactory(factory, tb);
}
