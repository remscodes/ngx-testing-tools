import { ProviderToken } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { fromInjector } from '../../../injector';
import { InjectionStore } from './models/injected-store.model';

export function buildInjected(fixture: ComponentFixture<unknown>, injectedMap: Map<ProviderToken<any>, string>): InjectionStore['injected'] {
  const injected: InjectionStore<any>['injected'] = {};
  for (const [key, value] of injectedMap.entries()) {
    injected[value] = fromInjector(fixture, key);
  }
  return injected;
}
