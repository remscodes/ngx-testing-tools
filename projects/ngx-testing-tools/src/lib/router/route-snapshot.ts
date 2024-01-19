import { ActivatedRouteSnapshot, Data, Params } from '@angular/router';

export interface RouteSnapshotConfig {
  data?: Data;
  params?: Params;
  queryParams?: Params;
}

export function buildRouteSnapshot(config: RouteSnapshotConfig = {}): ActivatedRouteSnapshot {
  const { data, params, queryParams } = config;
  const route = new ActivatedRouteSnapshot();

  if (data) route.data = data;
  if (params) route.params = params;
  if (queryParams) route.queryParams = queryParams;

  return route;
}
