import { BaseTools } from '../../../common/tools/base/models/base-tools.model';

export interface ModuleTools<T, I extends {} = {}> extends BaseTools<I> {
  /**
   * The described module instance.
   */
  module: T;
}
