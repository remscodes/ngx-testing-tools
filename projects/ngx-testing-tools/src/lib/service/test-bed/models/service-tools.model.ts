import { BaseTools } from '../../../common/test-bed/base/models/base-tools.model';
import { HttpTools } from '../../../common/test-bed/http/models/http-tools.model';

export interface ServiceTools<T, I extends {} = {}> extends BaseTools<I> {
  /**
   * The described service instance.
   */
  service: T;
  http: HttpTools;
}
