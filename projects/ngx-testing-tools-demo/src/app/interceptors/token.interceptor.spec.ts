import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { interceptorTestBed } from 'ngx-testing-tools';
import { Store } from '../services/store.service';
import { HEADER_KEY, HEADER_VALUE, tokenInterceptor } from './token.interceptor';

describe('tokenInterceptor', () => {
  const tb = interceptorTestBed(tokenInterceptor(), {
    providers: [Store],
  });

  it('should put token value in header', tb(({ inspect, rx }, done) => {
    const req = new HttpRequest('GET', '/test');
    expect(req.headers.has(HEADER_KEY)).toBeFalse();

    rx.remind = inspect.request(req).subscribe({
      next: ({ headers }: HttpRequest<unknown>) => {
        expect(headers.get(HEADER_KEY)).toEqual(HEADER_VALUE);
        done();
      },
    });
  }));

  it('should failed and return 500', tb(({ inspect, rx, injector }, done) => {
    const store = injector.get(Store);
    expect(store.lastInterceptedError()).toBeNull();

    const res = new HttpErrorResponse({ status: 500 });

    rx.remind = inspect.errorResponse(res).subscribe({
      error: () => {
        expect(store.lastInterceptedError()?.status).toEqual(500);
        done();
      },
    });
  }));
});
