import { ProviderToken } from '@angular/core';
import { Routes } from '@angular/router';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { RouterTestBedFactory } from '../router-test-bed-factory';
import { RouterTools } from '../tools';

export interface RouterTestBed<T extends Routes, S extends InjectionStore = InjectionStore> extends RouterTestBedFactory<T, S> {
  (assertion: EnhancedJasmineCallback<RouterTools<T, S['injected']>>): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): RouterTestBed<T, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;
}
