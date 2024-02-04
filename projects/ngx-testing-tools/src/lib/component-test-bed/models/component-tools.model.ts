import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { BaseTools } from '../../common/test-bed/base/models/base-tools.model';
import { HttpTestingTools } from '../../common/test-bed/http/models/http-testing-tools.model';
import { ComponentActionTools } from '../tools/action/models/component-action-tools.model';
import { ComponentQueryTools } from '../tools/query/models/component-query-tools.model';

export interface ComponentTools<T, I extends {} = {}> extends BaseTools<I>, HttpTestingTools {
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
