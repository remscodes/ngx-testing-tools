import { buildCustomTools } from '../../common/test-bed/custom-tools';
import { assertService } from './assertions/assert-service';
import { ServiceTools } from './models';
import { ServiceTestBedFactory } from './service-test-bed-factory';

export function buildServiceTools<T>(factory: ServiceTestBedFactory<T>): ServiceTools<T> {
  const service: T = factory['service'];
  assertService(service);
  
  const { injected, injector } = buildCustomTools(factory);

  return { injected, injector, service };
}
