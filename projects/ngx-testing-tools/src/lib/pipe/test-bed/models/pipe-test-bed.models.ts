import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { InjectionStore } from '../../../common/test-bed/store/models/injected-store.model';
import { PipeTestBedFactory } from '../pipe-test-bed-factory';
import { PipeExtraOptions } from './pipe-extra-options.model';
import { PipeTools } from './pipe-tools.model';

export interface PipeTestBed<T, I extends InjectionStore = InjectionStore> extends PipeTestBedFn<T, I>, PipeTestBedFactory<T, I> {}

type PipeTestBedFn<T, I extends InjectionStore> = (assertion: PipeCallback<T, I['injected']>, options?: PipeExtraOptions) => jasmine.ImplementationCallback

export type PipeCallback<T, I extends {}> = EnhancedJasmineCallback<PipeTools<T, I>>
