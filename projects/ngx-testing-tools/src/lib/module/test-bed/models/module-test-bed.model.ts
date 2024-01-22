import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../../common/test-bed/store/models/injected-store.model';
import { ModuleTestBedFactory } from '../module-test-bed-factory';
import { ModuleTools } from './module-tools.model';

export interface ModuleTestBed<T, I extends InjectionStore = InjectionStore> extends ModuleTestBedFn<T, I>, ModuleTestBedFactory<T, I> {}

type ModuleTestBedFn<T, I extends InjectionStore> = (assertion: ModuleAssertion<T, I['injected']>) => jasmine.ImplementationCallback

export type ModuleAssertion<T, I extends {}> = EnhancedJasmineCallback<ModuleTools<T, I>>
