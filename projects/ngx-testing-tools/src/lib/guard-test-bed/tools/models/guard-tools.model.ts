import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { HttpTestingTools } from '../../../common/tools/http/models/http-testing-tools.model';

export interface GuardTools<T, I extends {} = {}> extends HttpTestingTools, BaseTools<I> {
  /**
   * The described guard.
   */
  guard: T;

  challenge: any;
}
