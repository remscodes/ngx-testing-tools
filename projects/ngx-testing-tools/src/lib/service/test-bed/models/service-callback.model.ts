import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { ServiceTools } from './service-tools.model';

export type ServiceCallback<T, I extends {}> = EnhancedJasmineCallback<ServiceTools<T, I>>
