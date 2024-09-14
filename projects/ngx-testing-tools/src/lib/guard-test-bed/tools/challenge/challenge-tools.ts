import { Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { buildRouteSnapshot } from '../../../router/route-snapshot';
import { InternalGuardCan } from '../../models/guard-can.model';
import { GuardProxy } from '../../proxy/guard-proxy';
import { isCanActivateChildGuard, isCanActivateGuard, isCanDeactivateGuard, isCanLoadGuard, isCanMatchGuard } from '../../utils/guard.util';
import { ChallengeInfo } from './models/challenge-info.model';
import { ChallengeTools } from './models/challenge-tools.model';

export function buildChallengeTools(guardProxy: GuardProxy, injector: Injector, guardType: InternalGuardCan): ChallengeTools<any> {
  const guard = guardProxy.instance;

  switch (true) {
    case isCanActivateGuard(guard, guardType):
      return buildChallengeToolsForActivate(guardProxy, injector);

    case isCanActivateChildGuard(guard, guardType):
      return buildChallengeToolsForActivateChild(guardProxy, injector);

    case isCanDeactivateGuard(guard, guardType):
      return buildChallengeToolsForDeactivate(guardProxy, injector);

    case isCanLoadGuard(guard, guardType):
      return buildChallengeToolsForLoad(guardProxy, injector);

    case isCanMatchGuard(guard, guardType):
      return buildChallengeToolsForMatch(guardProxy, injector);

    default:
      throw new Error(`Unknown guard type (${guardType}) or invalid passed guard (${guard.name ?? guard}).`);
  }
}

function buildChallengeToolsForActivate(guardProxy: GuardProxy, injector: Injector): ChallengeTools<unknown> {
  const challenge: ChallengeTools<any> = () => {
    const route: ActivatedRouteSnapshot = buildRouteSnapshot();
    const state: RouterStateSnapshot = getRouterState(injector);

    return guardProxy.canActivate(route, state);
  };

  challenge.withInfo = (info: ChallengeInfo) => {
    const {
      currentState: state = getRouterState(injector),
      data,
      params,
      queryParams,
    } = info;

    const route: ActivatedRouteSnapshot = buildRouteSnapshot({ data, params, queryParams });

    return guardProxy.canActivate(route, state);
  };

  return challenge;
}

function buildChallengeToolsForActivateChild(guardProxy: GuardProxy, injector: Injector): ChallengeTools<unknown> {
  const challenge: ChallengeTools<any> = () => {
    const route: ActivatedRouteSnapshot = buildRouteSnapshot();
    const state: RouterStateSnapshot = getRouterState(injector);

    return guardProxy.canActivateChild(route, state);
  };

  challenge.withInfo = (info: ChallengeInfo) => {
    const {
      currentState: state = getRouterState(injector),
      data,
      params,
      queryParams,
    } = info;

    const route: ActivatedRouteSnapshot = buildRouteSnapshot({ data, params, queryParams });

    return guardProxy.canActivateChild(route, state);
  };

  return challenge;
}

function buildChallengeToolsForDeactivate(guardProxy: GuardProxy, injector: Injector): ChallengeTools<unknown> {
  const challenge: ChallengeTools<any> = () => {
    const currentRoute: ActivatedRouteSnapshot = buildRouteSnapshot();
    const state: RouterStateSnapshot = getRouterState(injector);

    return guardProxy.canDeactivate({}, currentRoute, state, state);
  };

  challenge.withInfo = (info: ChallengeInfo) => {
    const {
      currentState = getRouterState(injector),
      nextState = currentState,
      component = {},
      data,
      params,
      queryParams,
    } = info;

    const currentRoute: ActivatedRouteSnapshot = buildRouteSnapshot({ data, params, queryParams });

    return guardProxy.canDeactivate(component, currentRoute, currentState, nextState);
  };

  return challenge;
}

function buildChallengeToolsForLoad(guardProxy: GuardProxy, _injector: Injector): ChallengeTools<unknown> {
  const challenge: ChallengeTools<any> = () => {
    return guardProxy.canLoad({}, []);
  };

  challenge.withInfo = (info: ChallengeInfo) => {
    const {
      route = {},
      segments = [],
    } = info;
    return guardProxy.canLoad(route, segments);
  };

  return challenge;
}

function buildChallengeToolsForMatch(guardProxy: GuardProxy, _injector: Injector): ChallengeTools<unknown> {
  const challenge: ChallengeTools<any> = () => {
    return guardProxy.canMatch({}, []);
  };

  challenge.withInfo = (info: ChallengeInfo) => {
    const {
      route = {},
      segments = [],
    } = info;
    return guardProxy.canMatch(route, segments);
  };

  return challenge;
}

function getRouterState(injector: Injector): RouterStateSnapshot {
  return injector.get(Router).routerState.snapshot;
}
