import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../../common/test-bed/store';
import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { ComponentExtraOptions } from './component-extra-options.model';
import { ComponentTools } from './component-tools.model';

export interface ComponentTestBed<T, I extends InjectionStore = InjectionStore> extends ComponentTestBedFn<T, I>, ComponentTestBedFactory<T, I> {}

export type ComponentTestBedFn<T, I extends InjectionStore> = (assertion: ComponentAssertion<T, I['injected']>, options?: ComponentExtraOptions) => jasmine.ImplementationCallback

export type ComponentAssertion<T, I extends {}> = EnhancedJasmineCallback<ComponentTools<T, I>>
