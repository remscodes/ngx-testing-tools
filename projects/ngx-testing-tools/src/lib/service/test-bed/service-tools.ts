import { buildBaseTools } from '../../common/test-bed/base/base-tools';
import { assertService } from './assertions/assert-service';
import { ServiceTools } from './models';
import { ServiceTestBedFactory } from './service-test-bed-factory';

export function buildServiceTools<T>(factory: ServiceTestBedFactory<T>): ServiceTools<T> {
  const service: T = factory['service'];
  assertService(service);

  const { injected, injector } = buildBaseTools(factory);

  return { injected, injector, service };
}
