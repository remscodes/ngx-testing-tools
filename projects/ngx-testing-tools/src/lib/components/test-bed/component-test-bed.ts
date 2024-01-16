import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { assertComponentFixture } from './assert-fixture';
import { buildComponentActionTools } from './component-action-tools';
import { buildComponentQueryTools } from './component-query-tools';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { ComponentExtraOptions } from './models';
import { ComponentActionTools } from './models/component-action-tools.model';
import { ComponentQueryTools } from './models/component-query-tools.model';
import { ComponentAssertion, ComponentTestBed } from './models/component-test-bed.models';
import { InjectionStore } from './store';
import { buildInjected } from './store/injected';

/**
 * Creates a new `ComponentTestBed` to configure the test bed and wrap the assertion test.
 * @param rootComponent - The described Component.
 */
export function componentTestBed<T>(rootComponent: Type<T>): ComponentTestBed<T> {
  const factory = new ComponentTestBedFactory(rootComponent);

  const tb: ComponentTestBed<T> = ((assertionCb: ComponentAssertion<T, any>, options: ComponentExtraOptions = {}) => {
    const { startDetectChanges = true } = options;

    const expectationFn = (done: DoneFn = null!) => {
      const fixture: ComponentFixture<T> = factory['fixture'];
      assertComponentFixture(fixture);

      const { componentInstance: component, debugElement: debug } = fixture;
      const { injector } = debug;

      const query: ComponentQueryTools = buildComponentQueryTools(fixture);
      const action: ComponentActionTools = buildComponentActionTools(fixture);
      const injected: InjectionStore['injected'] = buildInjected(factory);

      if (startDetectChanges) fixture.detectChanges();

      return assertionCb({ fixture, component, injector, query, action, injected, debug }, done);
    };

    return (assertionCb.length > 1)
      ? (done: DoneFn) => expectationFn(done)
      : () => expectationFn();
  }) as ComponentTestBed<T>;

  return mergeFactoryToFn(factory, tb);
}

function mergeFactoryToFn<T>(factory: ComponentTestBedFactory<T, any>, tb: ComponentTestBed<T, any>): ComponentTestBed<T> {
  tb.import = (imports) => {
    factory.import(imports);
    return tb;
  };
  tb.provide = (providers) => {
    factory.provide(providers);
    return tb;
  };
  tb.declare = (declarations) => {
    factory.declare(declarations);
    return tb;
  };
  tb.inject = (name, token) => {
    factory.inject(name, token);
    return tb;
  };

  tb.shouldCreate = factory.shouldCreate.bind(factory);
  tb.compile = factory.compile.bind(factory);

  return tb;
}
