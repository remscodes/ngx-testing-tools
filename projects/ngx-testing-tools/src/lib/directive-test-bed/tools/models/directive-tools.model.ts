import { ComponentFixture } from '@angular/core/testing';
import { BaseTools } from '../../../common/tools/base/models/base-tools.model';

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
}
