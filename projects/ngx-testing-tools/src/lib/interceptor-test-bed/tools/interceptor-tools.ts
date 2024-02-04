import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildHttpTools } from '../../common/tools/http/http-tools';
import { InterceptorTestBedFactory } from '../interceptor-test-bed-factory';
import { InterceptorTools } from './models';

export function buildInterceptorTools<T>(factory: InterceptorTestBedFactory<T>): InterceptorTools<T> {
  const module: T = factory['instance'];
  const { injected, injector, rx } = buildBaseTools(factory);
  const http = buildHttpTools(injector, { httpTesting: true });

  return { http, injected, injector, module, rx };
}
