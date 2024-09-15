import { BaseTools } from '../../tools/base/models/base-tools.model';
import { JasmineCallback } from './jasmine-callback.model';

export type EnhancedJasmineCallback<Tools extends BaseTools = BaseTools> = (tools: Tools, done: DoneFn) => ReturnType<JasmineCallback>
