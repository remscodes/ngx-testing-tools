import { PrettyMerge } from '../../../shared.model';
import { CommonTestBedFactory } from '../common-test-bed-factory';

export type CustomTestBed<
  Fn extends (...args: any[]) => jasmine.ImplementationCallback,
  Factory extends CommonTestBedFactory<any>
> = PrettyMerge<Fn & Factory>

