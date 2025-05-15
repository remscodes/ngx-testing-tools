import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { JasmineCallback } from '../../common/jasmine/models/jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { ResolverTestBedFactory } from '../resolver-test-bed-factory';
import { ResolverTools } from '../tools';
import { ResolverTestBedOptions } from './resolver-test-bed-options.model';

export interface ResolverTestBed<T, S extends InjectionStore = InjectionStore> extends ResolverTestBedFactory<T, S> {
  (assertion: EnhancedJasmineCallback<ResolverTools<T, S['injected']>>, options?: ResolverExtraOptions): JasmineCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): ResolverTestBed<T, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;
}

type ResolverExtraOptions = Pick<ResolverTestBedOptions, 'verifyHttp'>
