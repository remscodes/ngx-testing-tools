import { BaseTools } from '../base/models/base-tools.model';

export type EnhancedJasmineCallback<Tools extends BaseTools = BaseTools> = (tools: Tools, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
