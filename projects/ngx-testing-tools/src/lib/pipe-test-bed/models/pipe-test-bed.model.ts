import { PipeTransform, ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { PipeTestBedFactory } from '../pipe-test-bed-factory';
import { PipeTools } from '../tools';

export interface PipeTestBed<T extends PipeTransform, I extends InjectionStore = InjectionStore> extends PipeTestBedFactory<T, I> {
  (assertion: PipeCallback<T, I['injected']>): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): PipeTestBed<T, InjectionStore<PrettyMerge<I['injected'] & { [k in key]: instance }>>>;

  setup(action: PipeCallback<T, I['injected']>): jasmine.ImplementationCallback;
}

type PipeCallback<T, I extends {}> = EnhancedJasmineCallback<PipeTools<T, I>>
