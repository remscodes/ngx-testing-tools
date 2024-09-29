import { guardTestBed } from '../../../lib';
import { DeactivateComponent } from '../../fixtures/components/deactivate.component';
import { ACTIVATE_CHILD_GUARD, ActivateChildGuard } from '../../fixtures/guards/activate-child.guard';
import { ACTIVATE_GUARD, ActivateGuard } from '../../fixtures/guards/activate.guard';
import { DeactivateGuard, UNLOAD_GUARD } from '../../fixtures/guards/deactivate.guard';
import { LOAD_GUARD, LoadGuard } from '../../fixtures/guards/load.guard';
import { MATCH_GUARD, MatchGuard } from '../../fixtures/guards/match.guard';
import { AuthService } from '../../fixtures/services/auth.service';

describe('guardTestBed', () => {

  describe('with function', () => {

    describe('canActivate', () => {
      const tb = guardTestBed(ACTIVATE_GUARD, { type: 'CanActivate' })
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
      const tb = guardTestBed(ACTIVATE_CHILD_GUARD, { type: 'CanActivateChild' });

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

    describe('canLoad', () => {
      const tb = guardTestBed(LOAD_GUARD, { type: 'CanLoad' });

      it('should not load', tb(({ challenge }) => {
        const result = challenge();
        expect(result).toBeFalse();
      }));

      it('should load', tb(({ challenge }) => {
        const result = challenge.withInfo({ data: { isAdmin: true } });
        expect(result).toBeTrue();
      }));
    });

    describe('canMatch', () => {
      const tb = guardTestBed(MATCH_GUARD, { type: 'CanMatch' });

      it('should not match', tb(({ challenge }) => {
        const result = challenge();
        expect(result).toBeFalse();
      }));

      it('should match', tb(({ challenge }) => {
        const result = challenge.withInfo({ data: { isAdmin: true } });
        expect(result).toBeTrue();
      }));
    });
  });

  describe('with class', () => {

    describe('canActivate', () => {
      const tb = guardTestBed(ActivateGuard)
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
      const tb = guardTestBed(ActivateChildGuard);

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
      const tb = guardTestBed(DeactivateGuard)
        .provide(DeactivateComponent)
        .inject('component', DeactivateComponent);

      it('should deactivate', tb(({ challenge }) => {
        const result = challenge();
        expect(result).toBeTrue();
      }));

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

    describe('canLoad', () => {
      const tb = guardTestBed(LoadGuard);

      it('should not load', tb(({ challenge }) => {
        const result = challenge();
        expect(result).toBeFalse();
      }));

      it('should load', tb(({ challenge }) => {
        const result = challenge.withInfo({ data: { isAdmin: true } });
        expect(result).toBeTrue();
      }));
    });

    describe('canMatch', () => {
      const tb = guardTestBed(MatchGuard);

      it('should not match', tb(({ challenge }) => {
        const result = challenge();
        expect(result).toBeFalse();
      }));

      it('should match', tb(({ challenge }) => {
        const result = challenge.withInfo({ data: { isAdmin: true } });
        expect(result).toBeTrue();
      }));
    });
  });
});
