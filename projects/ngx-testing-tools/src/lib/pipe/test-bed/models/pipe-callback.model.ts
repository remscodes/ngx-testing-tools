import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { PipeTools } from './pipe-tools.model';

export type PipeCallback<T, I extends {}> = EnhancedJasmineCallback<PipeTools<T, I>>
