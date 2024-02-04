import { Injector } from '@angular/core';
import { InjectionStore } from '../../store/models/injected-store.model';
import { RxBox } from '../rx/rx-box';

export interface BaseTools<I extends {} = {}> extends InjectionStore<I> {
  /**
   * The root injector.
   */
  injector: Injector;
  /**
   * Box that automatically clears all supplied "Subscription" and "Subject".
   */
  rx: RxBox;
}
