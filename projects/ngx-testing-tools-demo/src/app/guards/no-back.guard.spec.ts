import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { challengeGuardDeactivate } from 'ngx-testing-tools';
import { Page1Component } from '../components/page-1/page-1.component';
import { AuthInfo } from '../services/auth-info.service';
import { noBackGuard } from './no-back.guard';

describe('noBackGuard', () => {
  let injector: Injector;
  let component: Page1Component;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    injector = TestBed.inject(Injector);
    component = TestBed.createComponent(Page1Component).componentInstance;
    state = TestBed.inject(Router).routerState.snapshot;
  });

  it('should pass', () => {
    runInInjectionContext(injector, () => {
      expect(challengeGuardDeactivate(noBackGuard(), component, state, state)).toBeTrue();
    });
  });

  it('should not pass', () => {
    const authInfo = TestBed.inject(AuthInfo);
    authInfo.logged = true;

    runInInjectionContext(injector, () => {
      expect(challengeGuardDeactivate(noBackGuard(), component, state, state)).toBeFalse();
    });
  });
});
