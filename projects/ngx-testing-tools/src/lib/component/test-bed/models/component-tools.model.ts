import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { CommonTools } from '../../../common/test-bed/models/common-tools.model';
import { ComponentActionTools } from './component-action-tools.model';
import { ComponentQueryTools } from './component-query-tools.model';

export interface ComponentTools<T, I extends {} = {}> extends CommonTools<I> {
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
