import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { ComponentExtraOptions } from './component-extra-options.model';
import { ComponentTools } from './component-tools.model';

export interface ComponentTestBed<T, I extends {}> extends ComponentTestBedFn<T, I>, ComponentTestBedFactory<T, I> {}

export type ComponentTestBedFn<T, I extends {}> = (assertion: ComponentAssertion<T, I>, options?: ComponentExtraOptions) => jasmine.ImplementationCallback

export type ComponentAssertion<T, I extends {}> = (tools: ComponentTools<T, I>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
