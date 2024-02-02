import { BaseTools } from '../../../common/test-bed/base/models/base-tools.model';

export interface PipeTools<T, I extends {} = {}> extends BaseTools<I> {
  /**
   * The described pipe instance.
   */
  pipe: T;
}
