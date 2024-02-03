import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../../common/test-bed/store/models/injected-store.model';
import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { ComponentExtraOptions } from './component-extra-options.model';
import { ComponentTools } from './component-tools.model';

export interface ComponentTestBed<T, I extends InjectionStore = InjectionStore> extends ComponentTestBedFactory<T, I> {
  (assertion: ComponentCallback<T, I['injected']>, options?: ComponentExtraOptions): jasmine.ImplementationCallback;
}

export type ComponentCallback<T, I extends {}> = EnhancedJasmineCallback<ComponentTools<T, I>>
