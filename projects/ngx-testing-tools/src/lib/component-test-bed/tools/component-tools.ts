import { ComponentFixture } from '@angular/core/testing';
import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildHttpTools } from '../../common/tools/http/http-tools';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';
import { HttpTools } from '../../common/tools/http/models/http-tools.model';
import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { buildComponentActionTools } from './action/component-action-tools';
import { ComponentActionTools } from './action/models/component-action-tools.model';
import { ComponentTools } from './models';
import { buildComponentQueryTools } from './query/component-query-tools';
import { ComponentQueryTools } from './query/models/component-query-tools.model';

interface ComponentToolsBuilderOptions extends HttpOptions {}

export function buildComponentTools<T>(factory: ComponentTestBedFactory<T>, options: ComponentToolsBuilderOptions): ComponentTools<T> {
  const fixture: ComponentFixture<T> = factory['fixture'];
  const { componentInstance: component, debugElement: debug } = fixture;
  const element: HTMLElement = debug.children[0]?.nativeElement;

  const query: ComponentQueryTools = buildComponentQueryTools(fixture);
  const action: ComponentActionTools = buildComponentActionTools(fixture);
  const { injected, injector, rx } = buildBaseTools(factory, { thisInjector: debug.injector });
  const http: HttpTools = buildHttpTools(injector, options);

  return { action, component, debug, element, fixture, http, injected, injector, query, rx };
}
