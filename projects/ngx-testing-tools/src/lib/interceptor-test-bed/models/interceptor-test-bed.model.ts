import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { JasmineCallback } from '../../common/jasmine/models/jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { InterceptorTestBedFactory } from '../interceptor-test-bed-factory';
import { InterceptorTools } from '../tools';
import { InterceptorTestBedOptions } from './interceptor-test-bed-options.model';

export interface InterceptorTestBed<T, S extends InjectionStore = InjectionStore> extends InterceptorTestBedFactory<T, S> {
  (assertion: EnhancedJasmineCallback<InterceptorTools<T, S['injected']>>, options?: InterceptorExtraOptions): JasmineCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): InterceptorTestBed<T, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;
}

type InterceptorExtraOptions = Pick<InterceptorTestBedOptions, 'verifyHttp'>
