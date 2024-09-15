import { guardTestBed } from '../../../lib/guard-test-bed';
import { DeactivateComponent } from '../../fixtures/components/deactivate.component';
import { ADMIN_GUARD, AdminGuard } from '../../fixtures/guards/admin.guard';
import { AUTH_GUARD, AuthGuard } from '../../fixtures/guards/auth.guard';
import { UNLOAD_GUARD, UnloadGuard } from '../../fixtures/guards/unload.guard';
import { AuthService } from '../../fixtures/services/auth.service';

describe('guardTestBed', () => {

  describe('with fn', () => {

    describe('canActivate', () => {
      const tb = guardTestBed(AUTH_GUARD, { type: 'CanActivate' })
        .provide(AuthService)
        .inject('auth', AuthService);

      it('should not activate', tb(({ challenge }) => {
        const result = challenge();
        expect(result).toBeFalse();
      }));

      it('should activate', tb(({ challenge, injected: { auth } }) => {
        auth.isLogin = true;

        const result = challenge();
        expect(result).toBeTrue();
      }));
    });

    describe('canActivateChild', () => {
      const tb = guardTestBed(ADMIN_GUARD, { type: 'CanActivateChild' });

      it('should not activate child', tb(({ challenge }) => {
        const result = challenge();
        expect(result).toBeFalse();
      }));

      it('should activate child', tb(({ challenge }) => {
        const result = challenge.withInfo({ data: { isAdmin: true } });
        expect(result).toBeTrue();
      }));
    });

    describe('canDeactivate', () => {
      const tb = guardTestBed(UNLOAD_GUARD, { type: 'CanDeactivate' })
        .provide(DeactivateComponent)
        .inject('component', DeactivateComponent);

      it('should not deactivate', tb(({ challenge, injected: { component } }) => {
        const result = challenge.withInfo({ component });
        expect(result).toBeFalse();
      }));

      it('should deactivate', tb(({ challenge, injected: { component } }) => {
        component.formSaved = true;

        const result = challenge.withInfo({ component });
        expect(result).toBeTrue();
      }));
    });
  });

  describe('with class', () => {

    describe('canActivate', () => {
      const tb = guardTestBed(AuthGuard)
        .provide(AuthService);

      it('should not activate', tb(({ challenge }) => {
        const result = challenge();
        expect(result).toBeFalse();
      }));

      it('should activate', tb(({ challenge, injector }) => {
        const auth = injector.get(AuthService);
        auth.isLogin = true;

        const result = challenge();
        expect(result).toBeTrue();
      }));
    });

    describe('canActivateChild', () => {
      const tb = guardTestBed(AdminGuard);

      it('should not activate child', tb(({ challenge }) => {
        const result = challenge();
        expect(result).toBeFalse();
      }));

      it('should activate child', tb(({ challenge }) => {
        const result = challenge.withInfo({ data: { isAdmin: true } });
        expect(result).toBeTrue();
      }));
    });

    describe('canDeactivate', () => {
      const tb = guardTestBed(UnloadGuard)
        .provide(DeactivateComponent)
        .inject('component', DeactivateComponent);

      it('should not deactivate', tb(({ challenge, injected: { component } }) => {
        const result = challenge.withInfo({ component });
        expect(result).toBeFalse();
      }));

      it('should deactivate', tb(({ challenge, injected: { component } }) => {
        component.formSaved = true;

        const result = challenge.withInfo({ component });
        expect(result).toBeTrue();
      }));
    });
  });
});
