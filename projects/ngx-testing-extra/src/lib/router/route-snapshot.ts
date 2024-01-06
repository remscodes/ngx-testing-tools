import { ActivatedRouteSnapshot, Data, Params } from '@angular/router';

export interface RouteSnapshotConfig {
  data?: Data;
  params?: Params;
  queryParams?: Params;
}

export function buildRouteSnapshot(config?: RouteSnapshotConfig): ActivatedRouteSnapshot {
  const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();

  if (config?.data) route.data = config.data;
  if (config?.params) route.params = config.params;
  if (config?.queryParams) route.queryParams = config.queryParams;

  return route;
}
