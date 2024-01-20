import { InjectionStore } from '../../../components';

export interface ServiceTools<T, I> extends InjectionStore<I> {
  service: T;
}
