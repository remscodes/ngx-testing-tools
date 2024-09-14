import { Data, Params, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';

export interface ChallengeInfo {
  data?: Data;
  params?: Params;
  queryParams?: Params;
  currentState?: RouterStateSnapshot;
  /**
   * Only for CanDeactivate
   */
  nextState?: RouterStateSnapshot;
  /**
   * Only for CanDeactivate
   */
  component?: any;
  /**
   * Only for CanMatch and CanLoad
   */
  route?: Route;
  /**
   * Only for CanMatch and CanLoad
   */
  segments?: UrlSegment[];
}
