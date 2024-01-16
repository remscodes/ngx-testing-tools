import { fromInjector } from '../../../injector';
import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { InjectionStore } from './models/injected-store.model';

export function buildInjected(factory: ComponentTestBedFactory<unknown>): InjectionStore<{}>['injected'] {
  const injected: InjectionStore<any>['injected'] = {};
  for (const [key, value] of factory['injected'].entries()) {
    injected[value] = fromInjector(factory['fixture'], key);
  }
  return injected;
}
