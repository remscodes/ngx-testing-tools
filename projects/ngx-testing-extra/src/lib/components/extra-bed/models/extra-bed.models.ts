import { ExtraBedFactory } from '../extra-bed-factory';
import { ExtraOptions } from './extra-options.model';
import { ExtraTools } from './extra-tools.model';

export interface ExtraBed<T> extends ExtraFn<T>, ExtraBedFactory<T> {}

export type ExtraFn<T> = (cb: ExtraCb<T>, opts?: ExtraOptions) => jasmine.ImplementationCallback

export type ExtraCb<T> = (tools: ExtraTools<T>, done: DoneFn) => ReturnType<jasmine.ImplementationCallback>
