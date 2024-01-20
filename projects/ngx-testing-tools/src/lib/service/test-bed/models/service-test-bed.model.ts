import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../../common/test-bed/store';
import { ServiceTestBedFactory } from '../service-test-bed-factory';
import { ServiceTools } from './service-tools.model';

export interface ServiceTestBed<T, I extends InjectionStore = InjectionStore> extends ServiceTestBedFn<T, I>, ServiceTestBedFactory<T, I> {}

export type ServiceTestBedFn<T, I extends InjectionStore> = (assertion: ServiceAssertion<T, I['injected']>) => jasmine.ImplementationCallback

export type ServiceAssertion<T, I extends {}> = EnhancedJasmineCallback<ServiceTools<T, I>>
