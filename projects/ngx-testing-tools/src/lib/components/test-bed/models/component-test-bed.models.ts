import { ComponentTestBedFactory } from '../component-test-bed-factory';
import { InjectionStore } from '../injected/models/injected-store.model';
import { ComponentExtraOptions } from './component-extra-options.model';
import { ComponentTools } from './component-tools.model';

export interface ComponentTestBed<T, I extends InjectionStore<{}> = InjectionStore<{}>> extends ComponentTestBedFn<T, I>, ComponentTestBedFactory<T, I> {}

export type ComponentTestBedFn<T, I extends InjectionStore<{}>> = (assertion: ComponentAssertion<T, I['injected']>, options?: ComponentExtraOptions) => jasmine.ImplementationCallback

export type ComponentAssertion<T, I extends {}> = (tools: ComponentTools<T, I>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
