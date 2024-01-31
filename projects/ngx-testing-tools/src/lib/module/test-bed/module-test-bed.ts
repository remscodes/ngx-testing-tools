import { Type } from '@angular/core';
import { doneFactory } from '../../common/test-bed/jasmine-done';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { postAsync } from '../../common/util/post-async';
import { Nullable } from '../../shared.model';
import { ModuleTestBedOptions, ModuleTools } from './models';
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

    const assertionWrapper = (done: Nullable<DoneFn>) => {
      const tools: ModuleTools<T> = buildModuleTools(factory);

      const postTest = () => {
        tools.rx['cleanAll']();
      };

      return (done)
        ? assertion(tools, doneFactory(done, postTest))
        : postAsync(assertion(tools, null!), postTest);
    };

    return (assertion.length > 1)
      ? (done: DoneFn) => assertionWrapper(done)
      : () => assertionWrapper(null);
  }) as ModuleTestBed<T>;

  return mergeFactoryToTestBed(factory, tb) as ModuleTestBed<T>;
}
