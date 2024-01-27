import { Injector } from '@angular/core';
import { RxBox } from '../../http/rx-box';
import { InjectionStore } from '../../store/models/injected-store.model';

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
