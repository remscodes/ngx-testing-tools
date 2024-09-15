import { Data, Params, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';

export interface RoutingInfo {
  /**
   * Angular routing data.
   * @default {}
   * @see Data
   */
  data?: Data;
  /**
   * Angular routing params.
   * @default {}
   * @see Params
   */
  params?: Params;
  /**
   * Angular routing queryParams/
   * @default {}
   * @see Params
   */
  queryParams?: Params;
  /**
   * Angular current `RouterStateSnapshot`.
   */
  currentState?: RouterStateSnapshot;
  /**
   * Only for CanDeactivate
   */
  nextState?: RouterStateSnapshot;
  /**
   * Component to be used for testing CanDeactivate guard.
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
