import { Type } from '@angular/core';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { ModuleTestBedOptions } from './models/module-test-bed-options.model';
import { ModuleAssertion, ModuleTestBed } from './models/module-test-bed.model';
import { ModuleTestBedFactory } from './module-test-bed-factory';
import { buildModuleTools } from './module-tools';

export function moduleTestBed<T>(rootModule: Type<T>, options: ModuleTestBedOptions = {}) {
  const factory = new ModuleTestBedFactory(rootModule, options);

  const tb: ModuleTestBed<T> = ((assertion: ModuleAssertion<T, any>) => {
    return (assertion.length > 1)
      ? (done: DoneFn) => assertion(buildModuleTools(factory), done)
      : () => assertion(buildModuleTools(factory), null!);
  }) as ModuleTestBed<T>;

  return mergeFactoryToTestBed(factory, tb) as ModuleTestBed<T>;
}
