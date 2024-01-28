import { ComponentFixture } from '@angular/core/testing';
import { assertInstance } from '../../common/assertion/assert-instance';
import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { buildComponentActionTools } from './component-action-tools';
import { buildComponentQueryTools } from './component-query-tools';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { ComponentTools } from './models';
import { ComponentActionTools } from './models/component-action-tools.model';
import { ComponentQueryTools } from './models/component-query-tools.model';

export function buildComponentTools<T>(factory: ComponentTestBedFactory<T>): ComponentTools<T> {
  const fixture: ComponentFixture<T> = factory['fixture'];
  assertInstance(fixture, ComponentFixture);

  const { componentInstance: component, debugElement: debug } = fixture;

  const query: ComponentQueryTools = buildComponentQueryTools(fixture);
  const action: ComponentActionTools = buildComponentActionTools(fixture);
  const { injected, injector, rx } = buildBaseTools(factory, { thisInjector: debug.injector });

  return { action, component, debug, fixture, injected, injector, query, rx };
}
