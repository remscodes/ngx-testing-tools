import { InjectionStore } from '../../../components';
import { ServiceTestBedFactory } from '../service-test-bed-factory';

export interface ServiceTestBed<T, I extends InjectionStore = InjectionStore> extends ServiceTestBedFactory<T, I> {}
