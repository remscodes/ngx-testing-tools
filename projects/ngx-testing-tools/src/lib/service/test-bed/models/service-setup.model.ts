import { ServiceTools } from './service-tools.model';

export type ServiceSetup<T, I> = (tools: ServiceTools<T, I>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
