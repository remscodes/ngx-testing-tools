import { ProviderToken } from '@angular/core';
import { InjectionStore } from '../../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../../shared.model';
import { ServiceTestBedFactory } from '../service-test-bed-factory';
import { ServiceCallback } from './service-callback.model';
import { ServiceExtraOptions } from './service-extra-options.model';

export interface ServiceTestBed<T, I extends InjectionStore = InjectionStore> extends ServiceTestBedFactory<T, I> {
  (assertion: ServiceCallback<T, I['injected']>, options?: ServiceExtraOptions): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): ServiceTestBed<T, InjectionStore<PrettyMerge<I['injected'] & { [k in key]: instance }>>>;
}
