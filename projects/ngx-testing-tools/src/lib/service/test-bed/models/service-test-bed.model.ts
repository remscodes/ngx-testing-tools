import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../../common/test-bed/store/models/injected-store.model';
import { ServiceTestBedFactory } from '../service-test-bed-factory';
import { ServiceTools } from './service-tools.model';

export interface ServiceTestBed<T, I extends InjectionStore = InjectionStore> extends ServiceTestBedFn<T, I>, ServiceTestBedFactory<T, I> {}

type ServiceTestBedFn<T, I extends InjectionStore> = (assertion: ServiceCallback<T, I['injected']>) => jasmine.ImplementationCallback

export type ServiceCallback<T, I extends {}> = EnhancedJasmineCallback<ServiceTools<T, I>>
