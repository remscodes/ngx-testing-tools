import { ComponentFixture } from '@angular/core/testing';
import { assertInstance } from '../../common/assertion/assert-instance';
import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { buildHttpTools } from '../../common/test-bed/http/http-tools';
import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { HttpTools } from '../../common/test-bed/http/models/http-tools.model';
import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { ComponentTools } from '../models';
import { buildComponentActionTools } from './action/component-action-tools';
import { ComponentActionTools } from './action/models/component-action-tools.model';
import { buildComponentQueryTools } from './query/component-query-tools';
import { ComponentQueryTools } from './query/models/component-query-tools.model';

interface ComponentToolsBuilderOptions extends HttpOptions {}

export function buildComponentTools<T>(factory: ComponentTestBedFactory<T>, options: ComponentToolsBuilderOptions): ComponentTools<T> {
  const fixture: ComponentFixture<T> = factory['fixture'];
  assertInstance(fixture, ComponentFixture);

  const { componentInstance: component, debugElement: debug } = fixture;

  const query: ComponentQueryTools = buildComponentQueryTools(fixture);
  const action: ComponentActionTools = buildComponentActionTools(fixture);
  const { injected, injector, rx } = buildBaseTools(factory, { thisInjector: debug.injector });
  const http: HttpTools = buildHttpTools(injector, options);

  return { action, component, debug, fixture, http, injected, injector, query, rx };
}
