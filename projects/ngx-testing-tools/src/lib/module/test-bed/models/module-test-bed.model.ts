import { ProviderToken } from '@angular/core';
import { InjectionStore } from '../../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../../shared.model';
import { ModuleTestBedFactory } from '../module-test-bed-factory';
import { ModuleCallback } from './module-callback.model';

export interface ModuleTestBed<T, I extends InjectionStore = InjectionStore> extends ModuleTestBedFactory<T, I> {
  (assertion: ModuleCallback<T, I['injected']>): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): ModuleTestBed<T, InjectionStore<PrettyMerge<I['injected'] & { [k in key]: instance }>>>;

  setup(action: ModuleCallback<T, I['injected']>): jasmine.ImplementationCallback;
}
