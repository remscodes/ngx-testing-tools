import { PrettyMerge } from '../../../../shared.model';
import { BaseTestBedFactory } from '../base-test-bed-factory';

export type BaseTestBed<
  Fn extends (...args: any[]) => jasmine.ImplementationCallback,
  Factory extends BaseTestBedFactory<any>
> = PrettyMerge<Fn & Factory>

