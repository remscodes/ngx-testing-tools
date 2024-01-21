import { CustomTools } from '../../../common/test-bed/models/custom-tools.model';

export interface ModuleTools<T, I extends {} = {}> extends CustomTools<I> {
  /**
   * The described module instance.
   */
  module: T;
}
