import { PipeTransform } from '@angular/core';
import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../../common/test-bed/store/models/injected-store.model';
import { PipeTestBedFactory } from '../pipe-test-bed-factory';
import { PipeExtraOptions } from './pipe-extra-options.model';
import { PipeTools } from './pipe-tools.model';

export interface PipeTestBed<T extends PipeTransform, I extends InjectionStore = InjectionStore> extends PipeTestBedFactory<T, I> {
  (assertion: PipeCallback<T, I['injected']>, options?: PipeExtraOptions): jasmine.ImplementationCallback;
}

export type PipeCallback<T, I extends {}> = EnhancedJasmineCallback<PipeTools<T, I>>
