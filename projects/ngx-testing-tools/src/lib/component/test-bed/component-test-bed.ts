import { Type } from '@angular/core';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { buildComponentTools } from './component-tools';
import { ComponentExtraOptions, ComponentTestBedOptions, ComponentTools } from './models';
import { ComponentAssertion, ComponentTestBed } from './models/component-test-bed.models';

/**
 * Creates a new `ComponentTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootComponent - The described Component.
 * @param options
 */
export function componentTestBed<T>(rootComponent: Type<T>, options: ComponentTestBedOptions = {}): ComponentTestBed<T> {
  const { startDetectChanges: globalStartDetectChanges } = options;

  const factory = new ComponentTestBedFactory(rootComponent, options);

  const tb: ComponentTestBed<T> = ((assertion: ComponentAssertion<T, any>, options: ComponentExtraOptions = {}) => {
    const { startDetectChanges = globalStartDetectChanges ?? true } = options;

    const assertionWrapper = (done: DoneFn) => {
      const tools: ComponentTools<T> = buildComponentTools(factory);

      if (startDetectChanges) tools.fixture.detectChanges();

      return assertion(tools, done);
    };

    return (assertion.length > 1)
      ? (done: DoneFn) => assertionWrapper(done)
      : () => assertionWrapper(null!);
  }) as ComponentTestBed<T>;

  tb.declare = (declarations: any) => {
    factory.declare(declarations);
    return tb;
  };
  return mergeFactoryToTestBed(factory, tb) as ComponentTestBed<T>;
}
