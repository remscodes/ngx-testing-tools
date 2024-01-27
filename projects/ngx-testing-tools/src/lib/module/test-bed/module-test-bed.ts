import { Type } from '@angular/core';
import { buildJasmineCallback } from '../../common/test-bed/action-callback';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { ModuleTestBedOptions } from './models';
import { ModuleCallback, ModuleTestBed } from './models/module-test-bed.model';
import { ModuleTestBedFactory } from './module-test-bed-factory';
import { buildModuleTools } from './module-tools';

export function moduleTestBed<T>(rootModule: Type<T>, options: ModuleTestBedOptions = {}) {
  const factory = new ModuleTestBedFactory(rootModule, options);

  const tb: ModuleTestBed<T> = ((assertion: ModuleCallback<T, any>) => {
    return buildJasmineCallback(factory, assertion, buildModuleTools)
  }) as ModuleTestBed<T>;

  return mergeFactoryToTestBed(factory, tb) as ModuleTestBed<T>;
}
