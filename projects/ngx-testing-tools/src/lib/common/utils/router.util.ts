import { Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Params, Router, RouterStateSnapshot } from '@angular/router';

export function getRouterState(injector: Injector): RouterStateSnapshot {
  return injector.get(Router).routerState.snapshot;
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

export interface RouteSnapshotConfig {
  data?: Data;
  params?: Params;
  queryParams?: Params;
}
