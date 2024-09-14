import { Injector } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { GuardProxy } from '../../proxy/guard-proxy';
import { ChallengeInfo } from './models/challenge-info.model';
import { ChallengeTools } from './models/challenge-tools.model';

export function buildChallengeTools<T>(guardProxy: GuardProxy, injector: Injector): ChallengeTools<any> {
  const challenge: ChallengeTools<any> = () => {

  };

  challenge.withInfo = (info: ChallengeInfo) => {
    const {
      state = getDefaultRouterState(injector),
      data = {},
      params = {},
      queryParams = {},
    } = info;
  };

  return challenge;
}

function getDefaultRouterState(injector: Injector): RouterStateSnapshot {
  return injector.get(Router).routerState.snapshot;
}
