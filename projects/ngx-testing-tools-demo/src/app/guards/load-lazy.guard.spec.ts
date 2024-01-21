import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { challengeGuardMatch } from 'ngx-testing-tools';
import { AuthInfo } from '../services/auth-info.service';
import { loadLazyGuard } from './load-lazy.guard';

describe('loadLazyGuard', () => {
  let injector: Injector;

  beforeEach(() => {
    injector = TestBed.inject(Injector);
  });

  it('should not pass', () => {
    runInInjectionContext(injector, () => {
      expect(challengeGuardMatch(loadLazyGuard(), {}, [])).toBeFalse();
    });
  });

  it('should pass', () => {
    const authInfo = TestBed.inject(AuthInfo);
    authInfo.logged = true;

    runInInjectionContext(injector, () => {
      expect(challengeGuardMatch(loadLazyGuard(), {}, [])).toBeTrue();
    });
  });
});
