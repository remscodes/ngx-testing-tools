import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { ModuleTestBedFactory } from '../module-test-bed-factory';
import { ModuleTools } from '../tools';

export interface ModuleTestBed<T, I extends InjectionStore = InjectionStore> extends ModuleTestBedFactory<T, I> {
  (assertion: ModuleCallback<T, I['injected']>): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): ModuleTestBed<T, InjectionStore<PrettyMerge<I['injected'] & { [k in key]: instance }>>>;

  setup(action: ModuleCallback<T, I['injected']>): jasmine.ImplementationCallback;
}

type ModuleCallback<T, I extends {}> = EnhancedJasmineCallback<ModuleTools<T, I>>
