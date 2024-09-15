import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { JasmineCallback } from '../../common/jasmine/models/jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { ModuleTestBedFactory } from '../module-test-bed-factory';
import { ModuleTools } from '../tools';

export interface ModuleTestBed<T, S extends InjectionStore = InjectionStore> extends ModuleTestBedFactory<T, S> {
  (assertion: EnhancedJasmineCallback<ModuleTools<T, S['injected']>>): JasmineCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): ModuleTestBed<T, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;
}
