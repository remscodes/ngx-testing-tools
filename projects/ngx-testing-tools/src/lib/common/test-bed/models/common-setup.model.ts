import { CommonTools } from './common-tools.model';

export type CommonSetup<I extends {}> = (tools: CommonTools<I>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
