import { Injector } from '@angular/core';
import { InjectionStore } from '../../../components';

export interface CommonTools<I extends {} = {}> extends InjectionStore<I> {
  /**
   * The root injector.
   */
  injector: Injector;
}
