import { EnhancedCallback } from '../../../common/test-bed/models/enhanced-callback.model';
import { ComponentTools } from './component-tools.model';

export type ComponentSetup<T, I extends {}> = EnhancedCallback<ComponentTools<T, I>>
