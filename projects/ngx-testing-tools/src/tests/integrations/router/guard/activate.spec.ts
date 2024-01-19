import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { challengeGuardActivate } from '../../../../lib/router';

describe('activate', () => {
  function activateGuardFactory(): CanActivateFn {
    return route => route.data['isAllowed'];
  }

  let state: RouterStateSnapshot;

  beforeEach(() => {
    state = TestBed.inject(Router).routerState.snapshot;
  });

  it('should pass', () => {
    const result: boolean = challengeGuardActivate(activateGuardFactory(), state, { data: { isAllowed: true } });
    expect(result).toBeTruthy();
  });

  it('should not pass', () => {
    const result: boolean = challengeGuardActivate(activateGuardFactory(), state, { data: { isAllowed: false } });
    expect(result).toBeFalse();
  });
});
