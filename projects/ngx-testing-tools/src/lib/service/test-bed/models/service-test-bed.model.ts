import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../../common/test-bed/store/models/injected-store.model';
import { ServiceTestBedFactory } from '../service-test-bed-factory';
import { ServiceExtraOptions } from './service-extra-options.model';
import { ServiceTools } from './service-tools.model';

export interface ServiceTestBed<T, I extends InjectionStore = InjectionStore> extends ServiceTestBedFactory<T, I> {
  (assertion: ServiceCallback<T, I['injected']>, options?: ServiceExtraOptions): jasmine.ImplementationCallback;
}

export type ServiceCallback<T, I extends {}> = EnhancedJasmineCallback<ServiceTools<T, I>>
