import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { buildHttpTools } from '../../common/test-bed/http/http-tools';
import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { HttpTools } from '../../common/test-bed/http/models/http-tools.model';
import { ServiceTools } from './models';
import { ServiceTestBedFactory } from './service-test-bed-factory';

interface ServiceToolsBuilderOptions extends HttpOptions {}

export function buildServiceTools<T>(factory: ServiceTestBedFactory<T>, options: ServiceToolsBuilderOptions): ServiceTools<T> {
  const service: T = factory['instance'];
  const { injected, injector, rx } = buildBaseTools(factory);
  const http: HttpTools = buildHttpTools(injector, options);

  return { http, injected, injector, rx, service };
}
