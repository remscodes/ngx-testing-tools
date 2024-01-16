import { DebugElement, Injector } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ComponentActionTools } from './component-action-tools.model';
import { ComponentQueryTools } from './component-query-tools.model';

export interface ComponentTools<T, I extends {}> {
  fixture: ComponentFixture<T>;
  component: T;
  injector: Injector;
  query: ComponentQueryTools;
  action: ComponentActionTools;
  injected: I;
  /**
   * Will be removed in v3.
   *
   * Use `fixture.debugElement` instead.
   * @deprecated
   */
  debug: DebugElement;
}
