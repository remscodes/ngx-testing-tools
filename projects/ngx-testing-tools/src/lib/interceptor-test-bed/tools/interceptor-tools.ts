import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildHttpTools } from '../../common/tools/http/http-tools';
import { HttpTools } from '../../common/tools/http/models/http-tools.model';
import { InterceptorTestBedFactory } from '../interceptor-test-bed-factory';
import { InterceptorProxy } from '../proxy/interceptor-class-proxy';
import { buildInspectTools } from './inspect/inspect-tools';
import { InpectTools } from './inspect/models/inspect-tools.model';
import { InterceptorTools } from './models';

export function buildInterceptorTools<T>(factory: InterceptorTestBedFactory<T>): InterceptorTools<T> {
  const interceptorProxy: InterceptorProxy = factory['instance'];
  const interceptor: T = interceptorProxy.instance;

  const { injected, injector, rx } = buildBaseTools(factory);
  const http: HttpTools = buildHttpTools(injector, { httpTesting: true });
  const inspect: InpectTools = buildInspectTools(interceptorProxy);

  return { http, injected, injector, inspect, interceptor, rx };
}
