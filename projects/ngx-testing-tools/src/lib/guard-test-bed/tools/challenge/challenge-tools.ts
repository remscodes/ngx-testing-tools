import { inject, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isConstructor } from '../../../common/utils/constructor.util';
import { buildRouteSnapshot, getRouterState } from '../../../common/utils/router.util';
import { InternalGuardCan } from '../../models/guard-can.model';
import { GuardProxy } from '../../proxy/guard-proxy';
import { isCanActivateChildGuard, isCanActivateGuard, isCanDeactivateGuard, isCanLoadGuard, isCanMatchGuard } from '../../utils/guard.util';
import { ChallengeTools } from './models/challenge-tools.model';
import { RoutingInfo } from './models/routing-info.model';

export function buildChallengeTools(guardProxy: GuardProxy, injector: Injector, guardType: InternalGuardCan): ChallengeTools<any> {
  const guard = guardProxy.instance;

  switch (true) {
    case isCanActivateGuard(guard, guardType):
      return buildChallengeToolsForActivate(guardProxy, injector, 'canActivate');

    case isCanActivateChildGuard(guard, guardType):
      return buildChallengeToolsForActivate(guardProxy, injector, 'canActivateChild');

    case isCanDeactivateGuard(guard, guardType):
      return buildChallengeToolsForDeactivate(guardProxy, injector);

    case isCanLoadGuard(guard, guardType):
      return buildChallengeToolsForLoad(guardProxy, 'canLoad');

    case isCanMatchGuard(guard, guardType):
      return buildChallengeToolsForLoad(guardProxy, 'canMatch');

    default:
      throw new Error(`Unknown guard type (${guardType}) or invalid passed guard (${guard.name ?? guard}).`);
  }
}

function buildChallengeToolsForActivate(guardProxy: GuardProxy, injector: Injector, key: 'canActivate' | 'canActivateChild'): ChallengeTools<unknown> {
  const challenge: ChallengeTools<any> = () => {
    const route: ActivatedRouteSnapshot = buildRouteSnapshot();
    const state: RouterStateSnapshot = getRouterState(injector);

    return guardProxy[key](route, state);
  };

  challenge.withInfo = (info: RoutingInfo) => {
    const {
      currentState: state = getRouterState(injector),
      data,
      params,
      queryParams,
    } = info;

    const route: ActivatedRouteSnapshot = buildRouteSnapshot({ data, params, queryParams });

    return guardProxy[key](route, state);
  };

  return challenge;
}

function buildChallengeToolsForDeactivate(guardProxy: GuardProxy, injector: Injector): ChallengeTools<unknown> {
  const challenge: ChallengeTools<any> = () => {
    const currentRoute: ActivatedRouteSnapshot = buildRouteSnapshot();
    const state: RouterStateSnapshot = getRouterState(injector);

    return guardProxy.canDeactivate({}, currentRoute, state, state);
  };

  challenge.withInfo = (info: RoutingInfo) => {
    const {
      currentState = getRouterState(injector),
      nextState = currentState,
      component: ComponentCtor,
      data,
      params,
      queryParams,
    } = info;

    const component = (isConstructor(ComponentCtor)) ? TestBed.runInInjectionContext(() => inject(ComponentCtor)) : ComponentCtor;
    const currentRoute: ActivatedRouteSnapshot = buildRouteSnapshot({ data, params, queryParams });

    return guardProxy.canDeactivate(component ?? {}, currentRoute, currentState, nextState);
  };

  return challenge;
}

function buildChallengeToolsForLoad(guardProxy: GuardProxy, key: 'canLoad' | 'canMatch'): ChallengeTools<unknown> {
  const challenge: ChallengeTools<any> = () => {
    return guardProxy[key]({ data: {} }, []);
  };

  challenge.withInfo = (info: RoutingInfo) => {
    const {
      route = {},
      data = {},
      segments = [],
    } = info;

    route.data ??= data;
    return guardProxy[key](route, segments);
  };

  return challenge;
}
