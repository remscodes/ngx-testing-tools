import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildHttpTools } from '../../common/tools/http/http-tools';
import { HttpTools } from '../../common/tools/http/models/http-tools.model';
import { InterceptorTestBedFactory } from '../interceptor-test-bed-factory';
import { buildInspectTools } from './inspect/inspect-tools';
import { InpectTools } from './inspect/models/inspect-tools.model';
import { InterceptorTools } from './models';
import { InterceptorWrapper } from './models/interceptor-wrapper.model';

export function buildInterceptorTools<T>(factory: InterceptorTestBedFactory<T>): InterceptorTools<T> {
  const interceptorWrapper: InterceptorWrapper<T> = factory['instance'];
  const interceptor: T = interceptorWrapper.rootInstance;

  const { injected, injector, rx } = buildBaseTools(factory);
  const http: HttpTools = buildHttpTools(injector, { httpTesting: true });
  const inspect: InpectTools = buildInspectTools(interceptorWrapper);

  return { http, injected, injector, inspect, interceptor, rx };
}
