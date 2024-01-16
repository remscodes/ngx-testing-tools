import { DebugElement, Injector } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ComponentActionTools } from './component-action-tools.model';
import { ComponentQueryTools } from './component-query-tools.model';
import { InjectionStore } from '../injected/models/injected-store.model';

export interface ComponentTools<T, I extends {}> extends InjectionStore<I> {
  fixture: ComponentFixture<T>;
  component: T;
  injector: Injector;
  query: ComponentQueryTools;
  action: ComponentActionTools;
  /**
   * Will be removed in v3.
   *
   * Use `fixture.debugElement` instead.
   * @deprecated
   */
  debug: DebugElement;
}
