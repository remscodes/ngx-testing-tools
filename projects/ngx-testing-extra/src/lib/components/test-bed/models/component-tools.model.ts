import { DebugElement, DestroyRef, Injector } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ComponentActionTools } from './component-action-tools.model';
import { ComponentQueryTools } from './component-query-tools.model';

export interface ComponentTools<T> {
  fixture: ComponentFixture<T>;
  component: T;
  injector: Injector;
  destroyRef: DestroyRef;
  debug: DebugElement;
  query: ComponentQueryTools;
  action: ComponentActionTools;
}
