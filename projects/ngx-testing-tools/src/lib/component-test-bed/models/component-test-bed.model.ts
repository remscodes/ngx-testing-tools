import { ProviderToken } from '@angular/core';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { ComponentCallback } from './component-callback.model';
import { ComponentExtraOptions } from './component-extra-options.model';

export interface ComponentTestBed<T, I extends InjectionStore = InjectionStore> extends ComponentTestBedFactory<T, I> {
  (assertion: ComponentCallback<T, I['injected']>, options?: ComponentExtraOptions): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): ComponentTestBed<T, InjectionStore<PrettyMerge<I['injected'] & { [k in key]: instance }>>>;

  setup(action: ComponentCallback<T, I['injected']>): jasmine.ImplementationCallback;
}
