import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { HttpTestingTools } from '../../../common/tools/http/models/http-testing-tools.model';
import { TriggerTools } from '../trigger/models/trigger-tools.model';

export interface ResolverTools<T, I extends {} = {}> extends HttpTestingTools, BaseTools<I> {
  /**
   * The described resolver.
   */
  resolver: T;
  /**
   * Activate the resolver to check the output.
   */
  trigger: TriggerTools;
}
