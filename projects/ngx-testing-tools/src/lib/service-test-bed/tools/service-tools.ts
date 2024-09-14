import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildHttpTools } from '../../common/tools/http/http-tools';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';
import { HttpTools } from '../../common/tools/http/models/http-tools.model';
import { ServiceTestBedFactory } from '../service-test-bed-factory';
import { ServiceTools } from './models';

export function buildServiceTools<T>(factory: ServiceTestBedFactory<T>, httpOptions: HttpOptions): ServiceTools<T> {
  const service: T = factory['instance'];
  const { injected, injector, rx } = buildBaseTools(factory);
  const http: HttpTools = buildHttpTools(injector, httpOptions);

  return { http, injected, injector, rx, service };
}
