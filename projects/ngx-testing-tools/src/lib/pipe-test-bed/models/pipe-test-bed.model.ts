import { PipeTransform, ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../common/jasmine/models/enhanced-jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../common/shared.models';
import { InjectionStore } from '../../common/tools/store/models/injected-store.model';
import { PipeTestBedFactory } from '../pipe-test-bed-factory';
import { PipeTools } from '../tools';

export interface PipeTestBed<T extends PipeTransform, S extends InjectionStore = InjectionStore> extends PipeTestBedFactory<T, S> {
  (assertion: EnhancedJasmineCallback<PipeTools<T, S['injected']>>): jasmine.ImplementationCallback;

  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): PipeTestBed<T, InjectionStore<PrettyMerge<S['injected'] & { [k in key]: instance }>>>;
}
