import { ComponentFixture } from '@angular/core/testing';
import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { ComponentActionTools } from '../../../component-test-bed/tools/action/models/component-action-tools.model';
import { ComponentQueryTools } from '../../../component-test-bed/tools/query/models/component-query-tools.model';

export interface DirectiveTools<T, H, I extends {} = {}> extends BaseTools<I> {
  /**
   * The described directive instance.
   */
  directive: T;
  /**
   * The host component fixture.
   */
  fixture: ComponentFixture<H>;
  /**
   * The host instance.
   */
  host: H;
  /**
   * Enhanced tools to query host elements.
   */
  query: ComponentQueryTools;
  /**
   * Enhanced tools to perform action on host elements.
   */
  action: ComponentActionTools;
}
