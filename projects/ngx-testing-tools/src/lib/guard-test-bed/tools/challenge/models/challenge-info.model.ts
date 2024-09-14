import { Data, Params, RouterStateSnapshot } from '@angular/router';

export interface ChallengeInfo {
  data?: Data;
  params?: Params;
  queryParams?: Params;
  state?: RouterStateSnapshot;
}
