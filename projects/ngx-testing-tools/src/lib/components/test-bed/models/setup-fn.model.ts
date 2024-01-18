import { ComponentTools } from './component-tools.model';

export type ComponentSetup<T, I extends {}> = (tools: ComponentTools<T, I>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
