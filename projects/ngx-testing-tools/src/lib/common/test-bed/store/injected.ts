import { Injector, ProviderToken } from '@angular/core';
import { InjectionStore } from './models/injected-store.model';

export function buildInjected(injector: Injector, injectedMap: Map<string, ProviderToken<any>>): InjectionStore['injected'] {
  const injected: InjectionStore<any>['injected'] = {};
  for (const [name, token] of injectedMap.entries()) {
    injected[name] = injector.get(token);
  }
  return injected;
}
