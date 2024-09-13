import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildHttpTools } from '../../common/tools/http/http-tools';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';
import { HttpTools } from '../../common/tools/http/models/http-tools.model';
import { buildRendererTools } from '../../common/tools/renderer/renderer-tools';
import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { ComponentTools } from './models';

export function buildComponentTools<T>(factory: ComponentTestBedFactory<T>, httpOptions: HttpOptions): ComponentTools<T> {
  const { action, element, fixture, host: component, query } = buildRendererTools(factory);
  const { injected, injector, rx } = buildBaseTools(factory, { thisInjector: fixture.debugElement.injector });
  const http: HttpTools = buildHttpTools(injector, httpOptions);

  return { action, component, debug: fixture.debugElement, element, fixture, http, injected, injector, query, rx };
}
