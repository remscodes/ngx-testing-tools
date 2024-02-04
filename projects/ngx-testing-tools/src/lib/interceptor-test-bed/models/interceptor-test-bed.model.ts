import { HttpInterceptor } from '@angular/common/http';
import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { InterceptorTestBedFactory } from '../interceptor-test-bed-factory';
import { InterceptorTools } from '../tools';
import { InterceptorExtraOptions } from './interceptor-extra-options.model';

export interface InterceptorTestBed<T extends HttpInterceptor, I extends InjectionStore = InjectionStore> extends InterceptorTestBedFactory<T, I> {
  (assertion: InterceptorCallback<T, I['injected']>, options?: InterceptorExtraOptions): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): InterceptorTestBed<T, InjectionStore<PrettyMerge<I['injected'] & { [k in key]: instance }>>>;

  setup(action: InterceptorCallback<T, I['injected']>): jasmine.ImplementationCallback;
}

type InterceptorCallback<T, I extends {}> = EnhancedJasmineCallback<InterceptorTools<T, I>>
