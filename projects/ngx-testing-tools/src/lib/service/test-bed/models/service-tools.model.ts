import { CommonTools } from '../../../common/test-bed/models/common-tools.model';

export interface ServiceTools<T, I extends {} = {}> extends CommonTools<I> {
  /**
   * Service instance.
   */
  service: T;
}
