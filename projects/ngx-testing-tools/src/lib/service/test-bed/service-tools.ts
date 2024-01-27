import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { buildHttpTools } from '../../common/test-bed/http/http-tools';
import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { assertService } from './assertions/assert-service';
import { ServiceTools } from './models';
import { ServiceTestBedFactory } from './service-test-bed-factory';

export function buildServiceTools<T>(factory: ServiceTestBedFactory<T>, options: HttpOptions): ServiceTools<T> {
  const service: T = factory['service'];
  assertService(service);

  const { injected, injector, rx } = buildBaseTools(factory);
  const http = buildHttpTools(injector, options);

  return { http, injected, injector, rx, service };
}
