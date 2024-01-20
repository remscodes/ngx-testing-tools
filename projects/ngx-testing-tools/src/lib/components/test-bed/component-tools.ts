import { ProviderToken } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { assertComponentFixture } from './assert-fixture';
import { buildComponentActionTools } from './component-action-tools';
import { buildComponentQueryTools } from './component-query-tools';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { ComponentTools } from './models';
import { ComponentActionTools } from './models/component-action-tools.model';
import { ComponentQueryTools } from './models/component-query-tools.model';
import { InjectionStore } from './store';
import { buildInjected } from './store/injected';

export function buildComponentTools(factory: ComponentTestBedFactory<any>): ComponentTools<any, any> {
  const fixture: ComponentFixture<unknown> = factory['fixture'];
  assertComponentFixture(fixture);

  const injectedMap: Map<string, ProviderToken<any>> = factory['injectedMap'];

  const { componentInstance: component, debugElement: debug } = fixture;
  const { injector } = debug;

  const query: ComponentQueryTools = buildComponentQueryTools(fixture);
  const action: ComponentActionTools = buildComponentActionTools(fixture);
  const injected: InjectionStore['injected'] = buildInjected(injector, injectedMap);

  return { fixture, component, injector, query, action, injected, debug };
}
