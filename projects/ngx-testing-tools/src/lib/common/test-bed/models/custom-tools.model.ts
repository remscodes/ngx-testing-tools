import { Injector } from '@angular/core';
import { InjectionStore } from '../store/models/injected-store.model';

export interface CustomTools<I extends {} = {}> extends InjectionStore<I> {
  /**
   * The root injector.
   */
  injector: Injector;
}