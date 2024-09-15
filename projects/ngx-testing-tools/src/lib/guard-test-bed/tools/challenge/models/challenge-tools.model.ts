import { MaybeAsync } from '@angular/router';
import { ChallengeInfo } from './challenge-info.model';

export interface ChallengeTools<R = MaybeAsync<any>> {
  /**
   * Check the guard result based on its current context.
   */
  (): R;

  /**
   * Check the guard result based on its current context and the provided routing information.
   * @param info
   */
  withInfo(info: ChallengeInfo): R;
}
