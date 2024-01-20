import { EnhancedJasmineCallback } from '../../../common/test-bed/models/enhanced-jasmine-callback.model';
import { ServiceTools } from './service-tools.model';

export type ServiceSetup<T, I extends {}> = EnhancedJasmineCallback<ServiceTools<T, I>>
