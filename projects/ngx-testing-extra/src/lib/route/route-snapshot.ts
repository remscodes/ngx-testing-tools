import { ActivatedRouteSnapshot, Data, Params } from '@angular/router';

export interface RouteSnapshotConfig {
  data?: Data;
  params?: Params;
}

export function buildRouteSnapshot(config?: RouteSnapshotConfig): ActivatedRouteSnapshot {
  const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();

  if (config?.data) route.data = config.data;
  if (config?.params) route.params = config.params;

  return route;
}
