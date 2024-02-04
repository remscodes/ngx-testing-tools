import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { HttpTestingTools } from '../../../common/tools/http/models/http-testing-tools.model';

export interface ServiceTools<T, I extends {} = {}> extends BaseTools<I>, HttpTestingTools {
  /**
   * The described service instance.
   */
  service: T;
}
