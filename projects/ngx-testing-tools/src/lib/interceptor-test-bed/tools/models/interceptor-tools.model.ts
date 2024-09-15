import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { HttpTestingTools } from '../../../common/tools/http/models/http-testing-tools.model';
import { InspectTools } from '../inspect/models/inspect-tools.model';

export interface InterceptorTools<T, I extends {} = {}> extends HttpTestingTools, BaseTools<I> {
  /**
   * The described interceptor instance.
   */
  interceptor: T;
  /**
   * Enhanced tools to inspect outgoing request and incoming response.
   */
  inspect: InspectTools;
}
