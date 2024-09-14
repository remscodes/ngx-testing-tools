import { guardTestBed } from '../../../lib/guard-test-bed';
import { AUTH_GUARD, AuthGuard } from '../../fixtures/guards/auth.guard';
import { AuthService } from '../../fixtures/services/auth.service';

describe('guardTestBed', () => {

  describe('with class', () => {
    const tb = guardTestBed(AuthGuard)
      .provide(AuthService);

    it('should not pass', tb(({ guard }) => {

    }));

    it('should pass', tb(({ injector }) => {
      const auth = injector.get(AuthService);
    }));
  });

  describe('with fn', () => {
    const tb = guardTestBed(AUTH_GUARD)
      .provide(AuthService);

    it('should not pass', tb(({ guard, challenge }) => {
      challenge();
    }));

    it('should pass', tb(({ injector }) => {
      const auth = injector.get(AuthService);
    }));
  });
});
