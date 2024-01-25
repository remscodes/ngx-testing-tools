import { TestBed } from '@angular/core/testing';
import { ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { of, tap } from 'rxjs';
import { checkResolver } from '../../../../lib';

describe('checkResolver', () => {
  function resolverFactory(): ResolveFn<string> {
    return route => of(route.params['endpoint']).pipe(
      tap({
        next: (value) => {
          if (!value) throw 'Mock Error API';
        },
      }),
    );
  }

  let state: RouterStateSnapshot;

  beforeEach(() => {
    state = TestBed.inject(Router).routerState.snapshot;
  });

  it('should resolver succeed', (done: DoneFn) => {
    checkResolver(resolverFactory(), state, { params: { endpoint: '/1' } })
      .subscribe({
        next: (value) => {
          expect(value).toEqual('/1');
          done();
        },
      });
  });

  it('should resolver failed', (done: DoneFn) => {
    checkResolver(resolverFactory(), state, { params: { endpoint: '' } })
      .subscribe({
        error: (err) => {
          expect(err).toEqual('Mock Error API');
          done();
        },
      });
  });
});
