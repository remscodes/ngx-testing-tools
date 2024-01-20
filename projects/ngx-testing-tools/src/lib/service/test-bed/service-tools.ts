import { Injector } from '@angular/core';
import { InjectionStore } from '../../common/test-bed/store';
import { buildInjected } from '../../common/test-bed/store/injected';
import { ServiceTools } from './models/service-tools.model';
import { ServiceTestBedFactory } from './service-test-bed-factory';

export function buildServiceTools(factory: ServiceTestBedFactory<any>): ServiceTools<any> {
  const service = factory['instance'];
  const injector = factory['testBed'].inject(Injector);
  const injected: InjectionStore['injected'] = buildInjected(injector, factory['injectedMap']);

  return { injected, injector, service };
}
