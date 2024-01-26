import { Injector } from '@angular/core';
import { buildInjected } from '../store/injected';
import { InjectionStore } from '../store/models/injected-store.model';
import { BaseTestBedFactory } from './base-test-bed-factory';
import { BaseTools } from './models/base-tools.model';

interface BaseToolsBuilderOptions {
  thisInjector?: Injector;
}

export function buildBaseTools<T>(factory: BaseTestBedFactory<T>, options?: BaseToolsBuilderOptions): BaseTools {
  const injector: Injector = options?.thisInjector ?? factory['testBed'].inject(Injector);
  const injected: InjectionStore['injected'] = buildInjected(injector, factory['injectedMap']);

  return { injected, injector };
}
