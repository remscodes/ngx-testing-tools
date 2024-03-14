import { TestBed } from '@angular/core/testing';
import { challengeGuardMatch } from 'ngx-testing-tools';
import { AuthInfo } from '../services/auth-info.service';
import { loadLazyGuard } from './load-lazy.guard';

describe('loadLazyGuard', () => {

  it('should not pass', () => {
    TestBed.runInInjectionContext(() => {
      expect(challengeGuardMatch(loadLazyGuard(), {}, [])).toBeFalse();
    });
  });

  it('should pass', () => {
    const authInfo = TestBed.inject(AuthInfo);
    authInfo.logged = true;

    TestBed.runInInjectionContext(() => {
      expect(challengeGuardMatch(loadLazyGuard(), {}, [])).toBeTrue();
    });
  });
});
