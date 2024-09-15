import { ActivatedRouteSnapshot, Data, Params } from '@angular/router';

export interface RouteSnapshotConfig {
  data?: Data;
  params?: Params;
  queryParams?: Params;
}

export function buildRouteSnapshot(config: RouteSnapshotConfig = {}): ActivatedRouteSnapshot {
  const {
    data = {},
    params = {},
    queryParams = {},
  } = config;

  const route = new ActivatedRouteSnapshot();
  route.data = data;
  route.params = params;
  route.queryParams = queryParams;

  return route;
}
