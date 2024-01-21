import { Injector } from '@angular/core';
import { CustomTestBedFactory } from './custom-test-bed-factory';
import { CustomTools } from './models/custom-tools.model';
import { buildInjected } from './store/injected';
import { InjectionStore } from './store/models/injected-store.model';

interface CustomToolsBuilderOptions {
  thisInjector?: Injector;
}

export function buildCustomTools<T>(factory: CustomTestBedFactory<T>, options?: CustomToolsBuilderOptions): CustomTools {
  const injector: Injector = options?.thisInjector ?? factory['testBed'].inject(Injector);
  const injected: InjectionStore['injected'] = buildInjected(injector, factory['injectedMap']);

  return { injected, injector };
}
