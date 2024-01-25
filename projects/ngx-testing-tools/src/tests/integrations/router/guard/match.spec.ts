import { CanMatchFn } from '@angular/router';
import { challengeGuardMatch } from '../../../../lib';

describe('challengeGuardMatch', () => {
  function matchGuardFactory(): CanMatchFn {
    return route => route.data?.['isAllowed'];
  }

  it('should match', () => {
    const result = challengeGuardMatch(matchGuardFactory(), { data: { isAllowed: true } }, []);
    expect(result).toBeTrue();
  });

  it('should not match', () => {
    const result = challengeGuardMatch(matchGuardFactory(), { data: { isAllowed: false } }, []);
    expect(result).toBeFalse();

  });
});
