import { BaseTools } from '../../../common/tools/base/models/base-tools.model';

export interface DirectiveTools<T, I extends {} = {}> extends BaseTools<I> {
  /**
   * The described directive instance.
   */
  directive: T;
}
