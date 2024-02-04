import { HttpInterceptor } from '@angular/common/http';
import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildHttpTools } from '../../common/tools/http/http-tools';
import { InterceptorTestBedFactory } from '../interceptor-test-bed-factory';
import { InterceptorTools } from './models';
import { InterceptorWrapper } from './models/interceptor-wrapper.model';

export function buildInterceptorTools<T extends HttpInterceptor>(factory: InterceptorTestBedFactory<T>): InterceptorTools<T> {
  const interceptorProxy: InterceptorWrapper<T> = factory['instance'];
  const interceptor = interceptorProxy.rootInstance;

  const { injected, injector, rx } = buildBaseTools(factory);
  const http = buildHttpTools(injector, { httpTesting: true });

  return { http, injected, injector, interceptor, rx };
}
