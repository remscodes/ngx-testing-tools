import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { buildHttpTools } from '../../common/test-bed/http/http-tools';
import { assertService } from './assertions/assert-service';
import { ServiceTools } from './models';
import { ServiceTestBedFactory } from './service-test-bed-factory';

export function buildServiceTools<T>(factory: ServiceTestBedFactory<T>): ServiceTools<T> {
  const service: T = factory['service'];
  assertService(service);

  const { injected, injector, rx } = buildBaseTools(factory);
  const http = buildHttpTools(injector);

  return { http, injected, injector, rx, service };
}
