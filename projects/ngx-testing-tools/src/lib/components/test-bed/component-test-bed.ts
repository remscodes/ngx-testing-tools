import { Type } from '@angular/core';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { buildComponentTools } from './component-tools';
import { ComponentExtraOptions, ComponentTools } from './models';
import { ComponentAssertion, ComponentTestBed } from './models/component-test-bed.models';

/**
 * Creates a new `ComponentTestBed` to configure the test bed and wrap the assertion test.
 * @param rootComponent - The described Component.
 */
export function componentTestBed<T>(rootComponent: Type<T>): ComponentTestBed<T> {
  const factory = new ComponentTestBedFactory(rootComponent);

  const tb: ComponentTestBed<T> = ((assertion: ComponentAssertion<T, any>, options: ComponentExtraOptions = {}) => {
    const { startDetectChanges = true } = options;

    const assertionWrapper = (done: DoneFn = null!) => {
      const tools: ComponentTools<T> = buildComponentTools(factory);

      if (startDetectChanges) tools.fixture.detectChanges();

      return assertion(tools, done);
    };

    return (assertion.length > 1)
      ? (done: DoneFn) => assertionWrapper(done)
      : () => assertionWrapper();
  }) as ComponentTestBed<T>;

  return mergeFactoryToTestBed(factory, tb);
}

function mergeFactoryToTestBed<T>(factory: ComponentTestBedFactory<T>, tb: ComponentTestBed<T, any>): ComponentTestBed<T> {
  tb.import = (imports: any) => {
    factory.import(imports);
    return tb;
  };
  tb.provide = (providers: any) => {
    factory.provide(providers);
    return tb;
  };
  tb.declare = (declarations: any) => {
    factory.declare(declarations);
    return tb;
  };
  tb.inject = (name, token) => {
    factory.inject(name, token);
    return tb;
  };

  tb.compile = factory.compile.bind(factory);
  tb.compileEach = factory.compileEach.bind(factory);
  tb.setup = factory.setup.bind(factory);
  tb.shouldCreate = factory.shouldCreate.bind(factory);

  return tb;
}
