import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { JasmineCallback } from '../../common/jasmine/models/jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { GuardTestBedFactory } from '../guard-test-bed-factory';
import { GuardTools } from '../tools';
import { GuardTestBedOptions } from './guard-test-bed-options.model';

export interface GuardTestBed<T, S extends InjectionStore = InjectionStore> extends GuardTestBedFactory<T, S> {
  (assertion: EnhancedJasmineCallback<GuardTools<T, S['injected']>>, options?: GuardExtraOptions): JasmineCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): GuardTestBed<T, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;
}

type GuardExtraOptions = Pick<GuardTestBedOptions, 'verifyHttp'>
