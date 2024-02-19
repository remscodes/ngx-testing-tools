import { ComponentFixture } from '@angular/core/testing';
import { ActionTools } from '../action/models/action-tools.model';
import { QueryTools } from '../query/models/query-tools.model';

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
  query: QueryTools;
  /**
   * Enhanced tools to perform action on elements from host.
   */
  action: ActionTools;
}
