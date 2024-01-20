import { CommonTools } from './common-tools.model';

export type EnhancedJasmineCallback<Tools extends CommonTools> = (tools: Tools, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
