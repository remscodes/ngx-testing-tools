import { PrettyMerge } from '../../../shared.model';
import { CustomTestBedFactory } from '../custom-test-bed-factory';

export type CustomTestBed<
  Fn extends (...args: any[]) => jasmine.ImplementationCallback,
  Factory extends CustomTestBedFactory<any>
> = PrettyMerge<Fn & Factory>

