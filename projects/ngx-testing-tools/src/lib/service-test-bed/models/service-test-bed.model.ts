import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { ServiceTestBedFactory } from '../service-test-bed-factory';
import { ServiceTools } from '../tools';

export interface ServiceTestBed<T, S extends InjectionStore = InjectionStore> extends ServiceTestBedFactory<T, S> {
  (assertion: ServiceCallback<T, S['injected']>, options?: ServiceExtraOptions): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): ServiceTestBed<T, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;

  setup(action: ServiceCallback<T, S['injected']>): jasmine.ImplementationCallback;
}

type ServiceCallback<T, I extends {}> = EnhancedJasmineCallback<ServiceTools<T, I>>

type ServiceExtraOptions = Pick<HttpOptions, 'verifyHttp'>
