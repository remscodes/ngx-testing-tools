import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { ModuleTools } from './module-tools.model';

export type ModuleCallback<T, I extends {}> = EnhancedJasmineCallback<ModuleTools<T, I>>
