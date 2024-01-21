import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { challengeGuardActivate } from 'ngx-testing-tools';
import { AuthInfo } from '../services/auth-info.service';
import { loginGuard } from './login.guard';

describe('loginGuard', () => {
  let injector: Injector;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    injector = TestBed.inject(Injector);
    state = TestBed.inject(Router).routerState.snapshot;
  });

  it('should not pass', () => {
    runInInjectionContext(injector, () => {
      expect(challengeGuardActivate(loginGuard(), state)).toBeFalse();
    });
  });

  it('should pass', () => {
    const authInfo = TestBed.inject(AuthInfo);
    authInfo.logged = true;

    runInInjectionContext(injector, () => {
      expect(challengeGuardActivate(loginGuard(), state)).toBeTrue();
    });
  });
});
