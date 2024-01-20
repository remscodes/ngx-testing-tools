import { Injector } from '@angular/core';
import { buildInjected } from '../../common/test-bed/store/injected';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { ServiceTools } from './models';
import { ServiceTestBedFactory } from './service-test-bed-factory';

export function buildServiceTools<T>(factory: ServiceTestBedFactory<T>): ServiceTools<T> {
  const service: T = factory['instance'];
  const injector: Injector = factory['testBed'].inject(Injector);
  const injected: InjectionStore['injected'] = buildInjected(injector, factory['injectedMap']);

  return { injected, injector, service };
}
