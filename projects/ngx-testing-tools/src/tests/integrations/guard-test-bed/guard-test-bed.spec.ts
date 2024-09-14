import { guardTestBed } from '../../../lib/guard-test-bed';
import { AUTH_GUARD, AuthGuard } from '../../fixtures/guards/auth.guard';
import { AuthService } from '../../fixtures/services/auth.service';

describe('guardTestBed', () => {

  describe('with class', () => {
    const tb = guardTestBed(AuthGuard)
      .provide(AuthService);

    it('should not pass', tb(({ challenge }) => {
      const result = challenge();
      expect(result).toBeFalse();
    }));

    it('should pass', tb(({ challenge, injector }) => {
      const auth = injector.get(AuthService);
      auth.isLogin = true;

      const result = challenge();
      expect(result).toBeTrue();
    }));
  });

  describe('with fn', () => {
    const tb = guardTestBed(AUTH_GUARD, { type: 'CanActivate' })
      .provide(AuthService);

    it('should not pass', tb(({ challenge }) => {
      const result = challenge();
      expect(result).toBeFalse();
    }));

    it('should pass', tb(({ challenge, injector }) => {
      const auth = injector.get(AuthService);
      auth.isLogin = true;

      const result = challenge();
      expect(result).toBeTrue();
    }));
  });
});
