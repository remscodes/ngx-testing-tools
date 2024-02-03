import { Type } from '@angular/core';
import { buildJasmineCallback } from '../../common/test-bed/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../../common/test-bed/merge-factory/merge-base-factory';
import { ModuleTestBedOptions } from './models';
import { ModuleCallback, ModuleTestBed } from './models/module-test-bed.model';
import { ModuleTestBedFactory } from './module-test-bed-factory';
import { buildModuleTools } from './module-tools';

/**
 * Creates a new `ModuleTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootModule - The described Module.
 * @param options
 */
export function moduleTestBed<T>(rootModule: Type<T>, options: ModuleTestBedOptions = {}) {
  const factory = new ModuleTestBedFactory(rootModule, options);

  const tb: ModuleTestBed<T> = ((assertion: ModuleCallback<T, any>) => {
    return buildJasmineCallback({
      callback: assertion,
      deferredTools: () => buildModuleTools(factory),
      postTest: (tools) => {
        tools.rx['cleanAll']();
      },
    });
  }) as ModuleTestBed<T>;

  return mergeBaseFactory(factory, tb) as ModuleTestBed<T>;
}
