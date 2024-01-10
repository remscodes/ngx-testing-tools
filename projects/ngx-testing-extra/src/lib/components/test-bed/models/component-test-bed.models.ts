import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { ComponentExtraOptions } from './component-extra-options.model';
import { ComponentTools } from './component-tools.model';

export interface ComponentTestBed<T> extends ComponentTestBedFn<T>, ComponentTestBedFactory<T> {}

export type ComponentTestBedFn<T> = (assertion: ComponentAssertion<T>, options?: ComponentExtraOptions) => jasmine.ImplementationCallback

export type ComponentAssertion<T> = (tools: ComponentTools<T>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
