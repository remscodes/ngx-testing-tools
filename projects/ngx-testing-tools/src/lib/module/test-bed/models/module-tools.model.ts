import { BaseTools } from '../../../common/test-bed/base/models/base-tools.model';

export interface ModuleTools<T, I extends {} = {}> extends BaseTools<I> {
  /**
   * The described module instance.
   */
  module: T;
}
