import { CommonTools } from './common-tools.model';

export type EnhancedCallback<Tools extends CommonTools> = (tools: Tools, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
