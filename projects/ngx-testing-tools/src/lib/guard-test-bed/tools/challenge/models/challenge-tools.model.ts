import { MaybeAsync } from '@angular/router';
import { ChallengeInfo } from './challenge-info.model';

export interface ChallengeTools<R = MaybeAsync<any>> {
  (): R;

  withInfo(info: ChallengeInfo): R;
}
