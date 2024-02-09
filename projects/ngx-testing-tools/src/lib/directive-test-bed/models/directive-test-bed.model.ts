import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { DirectiveTestBedFactory } from '../directive-test-bed-factory';
import { DirectiveTools } from '../tools';

export interface DirectiveTestBed<T, H, S extends InjectionStore = InjectionStore> extends DirectiveTestBedFactory<T, H, S> {
  (assertion: DirectiveCallback<T, S['injected']>): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): DirectiveTestBed<T, H, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;

  setup(action: DirectiveCallback<T, S['injected']>): jasmine.ImplementationCallback;
}

type DirectiveCallback<T, I extends {}> = EnhancedJasmineCallback<DirectiveTools<T, I>>
