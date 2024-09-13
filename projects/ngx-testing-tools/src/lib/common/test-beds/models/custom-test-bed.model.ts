import { ProviderToken } from '@angular/core';
import { EnhancedJasmineCallback } from '../../jasmine/models/enhanced-jasmine-callback.model';
import { NonEmptyString, PrettyMerge } from '../../shared.models';
import { BaseTestBedFactory } from '../base/base-test-bed-factory';
import { BaseTools } from '../../tools/base/models/base-tools.model';
import { InjectionStore } from '../../tools/store/models/injected-store.model';

export type CustomTestBed<
  InstanceType,
  Factory extends BaseTestBedFactory<InstanceType, Store>,
  Store extends InjectionStore = InjectionStore,
  Tools extends BaseTools = BaseTools,
  ExtraCbOptions = never
> = Factory & {
  (assertion: EnhancedJasmineCallback<Tools>, options?: ExtraCbOptions): jasmine.ImplementationCallback;
  inject<key extends string, instance>(name: NonEmptyString<key>, token: ProviderToken<instance>): CustomTestBed<InstanceType, Factory, InjectionStore<PrettyMerge<Store['injected'] & { [k in key]: instance }>>, Tools>;
}
