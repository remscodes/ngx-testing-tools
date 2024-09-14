import { ChallengeInfo } from './challenge-info.model';

export interface ChallengeTools<R> {
  (): R;

  withInfo(info: ChallengeInfo): R;
}
