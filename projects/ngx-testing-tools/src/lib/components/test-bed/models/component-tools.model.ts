import { DebugElement, Injector } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { InjectionStore } from '../store';
import { ComponentActionTools } from './component-action-tools.model';
import { ComponentQueryTools } from './component-query-tools.model';

export interface ComponentTools<T, I extends {} = {}> extends InjectionStore<I> {
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
