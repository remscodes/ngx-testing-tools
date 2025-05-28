import { MaybeAsync } from '../../../../common/models/maybe-async.model';
import { RoutingInfo } from './routing-info.model';

export interface ChallengeTools<R = MaybeAsync<any>> {
  /**
   * Check the guard result based on its current context.
   */
  (): R;

  /**
   * Check the guard result based on its current context and the provided routing information.
   * @param info
   */
  withInfo(info: RoutingInfo): R;
}
