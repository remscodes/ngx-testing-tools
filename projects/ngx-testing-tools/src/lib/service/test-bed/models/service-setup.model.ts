import { ServiceTools } from './service-tools.model';

export type ServiceSetup<T, I extends {}> = (tools: ServiceTools<T, I>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
