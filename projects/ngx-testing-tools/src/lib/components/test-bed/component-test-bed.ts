import { ProviderToken, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { assertComponentFixture } from './assert-fixture';
import { buildComponentActionTools } from './component-action-tools';
import { buildComponentQueryTools } from './component-query-tools';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { ComponentExtraOptions } from './models';
import { ComponentActionTools } from './models/component-action-tools.model';
import { ComponentQueryTools } from './models/component-query-tools.model';
import { ComponentAssertion, ComponentTestBed } from './models/component-test-bed.models';

/**
 * Creates a new `ComponentTestBed` to configure the test bed and wrap the assertion test.
 * @param rootComponent - The described Component.
 */
export function componentTestBed<T>(rootComponent: Type<T>): ComponentTestBed<T, {}> {
  const factory = new ComponentTestBedFactory(rootComponent);

  const tb: ComponentTestBed<T, any> = ((assertionCb: ComponentAssertion<T, any>, options: ComponentExtraOptions = {}) => {
    const { startDetectChanges = true } = options;

    const expectationFn = (done: DoneFn = null!) => {
      const fixture: ComponentFixture<T> = factory['fixture'];
      assertComponentFixture(fixture);

      const { componentInstance: component, debugElement: debug } = fixture;
      const { injector } = debug;

      const query: ComponentQueryTools = buildComponentQueryTools(fixture);
      const action: ComponentActionTools = buildComponentActionTools(fixture);

      const injected: Record<string, unknown> = {};
      for (const [key, value] of factory['injected'].entries()) {
        injected[value] = injector.get(key);
      }

      if (startDetectChanges) fixture.detectChanges();

      return assertionCb({ fixture, component, injector, injected, debug, query, action }, done);
    };

    return (assertionCb.length > 1)
      ? (done: DoneFn) => expectationFn(done)
      : () => expectationFn();
  }) as ComponentTestBed<T, any>;

  tb.import = factory.import.bind(factory) as any;
  tb.provide = factory.provide.bind(factory) as any;
  tb.declare = factory.declare.bind(factory) as any;
  tb.compile = factory.compile.bind(factory);
  tb.shouldCreate = factory.shouldCreate.bind(factory);
  tb.inject = (name: string, token: ProviderToken<unknown>) => {
    factory.inject(name, token);
    return tb;
  };

  return tb;
}
