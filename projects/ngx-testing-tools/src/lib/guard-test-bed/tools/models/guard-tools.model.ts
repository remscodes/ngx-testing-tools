import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { HttpTestingTools } from '../../../common/tools/http/models/http-testing-tools.model';
import { ChallengeTools } from '../challenge/models/challenge-tools.model';

export interface GuardTools<T, I extends {} = {}> extends HttpTestingTools, BaseTools<I> {
  /**
   * The described guard.
   */
  guard: T;
  /**
   * Tools to test if the guard pass or not depending on the current state and provided route info.
   */
  challenge: ChallengeTools<any>;
}
