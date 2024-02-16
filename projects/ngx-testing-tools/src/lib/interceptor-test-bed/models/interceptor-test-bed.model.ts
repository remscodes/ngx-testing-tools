import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { InterceptorTestBedFactory } from '../interceptor-test-bed-factory';
import { InterceptorTools } from '../tools';
import { InterceptorTestBedOptions } from './interceptor-test-bed-options.model';

export interface InterceptorTestBed<T, S extends InjectionStore = InjectionStore> extends InterceptorTestBedFactory<T, S> {
  (assertion: InterceptorCallback<T, S['injected']>, options?: InterceptorExtraOptions): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): InterceptorTestBed<T, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;

  setup(action: InterceptorCallback<T, S['injected']>): jasmine.ImplementationCallback;
}

type InterceptorCallback<T, I extends {}> = EnhancedJasmineCallback<InterceptorTools<T, I>>

type InterceptorExtraOptions = Pick<InterceptorTestBedOptions, 'verifyHttp'>
