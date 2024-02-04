import { EnhancedJasmineCallback } from '../../common/test-bed/models/enhanced-jasmine-callback.model';
import { ComponentTools } from '../tools';

export type ComponentCallback<T, I extends {}> = EnhancedJasmineCallback<ComponentTools<T, I>>
