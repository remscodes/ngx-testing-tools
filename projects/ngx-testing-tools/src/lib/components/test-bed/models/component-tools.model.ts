import { DebugElement, Injector } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { InjectionStore } from '../store';
import { ComponentActionTools } from './component-action-tools.model';
import { ComponentQueryTools } from './component-query-tools.model';

export interface ComponentTools<T, I extends {} = {}> extends InjectionStore<I> {
  /**
   * The described component fixture.
   */
  fixture: ComponentFixture<T>;
  /**
   * The described component instance.
   */
  component: T;
  /**
   * The fixture injector.
   */
  injector: Injector;
  /**
   * Enhanced tools to query elements.
   */
  query: ComponentQueryTools;
  /**
   * Enhanced tools to perform action on elements.
   */
  action: ComponentActionTools;
  /**
   * Will be removed in v3.
   *
   * Use `fixture.debugElement` instead.
   * @deprecated
   */
  debug: DebugElement;
}
