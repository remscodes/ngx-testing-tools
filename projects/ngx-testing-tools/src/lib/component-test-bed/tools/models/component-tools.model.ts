import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { HttpTestingTools } from '../../../common/tools/http/models/http-testing-tools.model';
import { ComponentActionTools } from '../action/models/component-action-tools.model';
import { ComponentQueryTools } from '../query/models/component-query-tools.model';

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
