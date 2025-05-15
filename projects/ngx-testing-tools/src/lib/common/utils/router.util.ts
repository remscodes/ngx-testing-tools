import { Injector } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

export function getRouterState(injector: Injector): RouterStateSnapshot {
  return injector.get(Router).routerState.snapshot;
}
