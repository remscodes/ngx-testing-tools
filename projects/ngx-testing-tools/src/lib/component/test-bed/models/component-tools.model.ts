import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { CustomTools } from '../../../common/test-bed/models/custom-tools.model';
import { ComponentActionTools } from './component-action-tools.model';
import { ComponentQueryTools } from './component-query-tools.model';

export interface ComponentTools<T, I extends {} = {}> extends CustomTools<I> {
  /**
   * The described component fixture.
   */
  fixture: ComponentFixture<T>;
  /**
   * The described component instance.
   */
  component: T;
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
