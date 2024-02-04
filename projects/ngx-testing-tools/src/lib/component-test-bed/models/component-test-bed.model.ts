import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { ComponentTools } from '../tools';
import { ComponentExtraOptions } from './component-extra-options.model';

export interface ComponentTestBed<T, I extends InjectionStore = InjectionStore> extends ComponentTestBedFactory<T, I> {
  (assertion: ComponentCallback<T, I['injected']>, options?: ComponentExtraOptions): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): ComponentTestBed<T, InjectionStore<PrettyMerge<I['injected'] & { [k in key]: instance }>>>;

  setup(action: ComponentCallback<T, I['injected']>): jasmine.ImplementationCallback;
}

type ComponentCallback<T, I extends {}> = EnhancedJasmineCallback<ComponentTools<T, I>>
