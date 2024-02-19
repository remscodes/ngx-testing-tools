import { ComponentFixture } from '@angular/core/testing';
import { ComponentActionTools } from '../action/models/component-action-tools.model';
import { ComponentQueryTools } from '../query/models/component-query-tools.model';

export interface RendererTools<T> {
  /**
   * The host component fixture.
   */
  fixture: ComponentFixture<T>;
  /**
   * The host component instance.
   */
  host: T;
  /**
   * The host component element.
   *
   * Can be undefined if `noTemplate` is `true`.
   */
  element: HTMLElement | undefined;
  /**
   * Enhanced tools to query elements from host.
   */
  query: ComponentQueryTools;
  /**
   * Enhanced tools to perform action on elements from host.
   */
  action: ComponentActionTools;
}
