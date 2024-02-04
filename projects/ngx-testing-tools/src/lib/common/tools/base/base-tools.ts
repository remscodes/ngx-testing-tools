import { Injector } from '@angular/core';
import { BaseTestBedFactory } from '../../test-beds/base/base-test-bed-factory';
import { buildInjected } from '../store/injected';
import { InjectionStore } from '../store/models/injected-store.model';
import { BaseTools } from './models/base-tools.model';
import { RxBox } from './rx/rx-box';

interface BaseToolsBuilderOptions {
  thisInjector?: Injector;
}

export function buildBaseTools<T>(factory: BaseTestBedFactory<T>, options?: BaseToolsBuilderOptions): BaseTools {
  const injector: Injector = options?.thisInjector ?? factory['testBed'].inject(Injector);
  const injected: InjectionStore['injected'] = buildInjected(injector, factory['injectedMap']);
  const rx = new RxBox();

  return { injected, injector, rx };
}
