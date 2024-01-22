import { CustomTools } from './custom-tools.model';

export type EnhancedJasmineCallback<Tools extends CustomTools = CustomTools> = (tools: Tools, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
