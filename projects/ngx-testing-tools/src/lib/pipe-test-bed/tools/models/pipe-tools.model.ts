import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { VerifyTools } from '../verify/models/verify-tools.model';

export interface PipeTools<T, I extends {} = {}> extends BaseTools<I> {
  /**
   * The described pipe instance.
   */
  pipe: T;
  /**
   * Enhanced tools to verify transformed value by the pipe.
   */
  verify: VerifyTools;
}
