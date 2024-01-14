# Interceptors

Utilities to check the behaviour of interceptors according to the success or failure of the request/response.

## Table of contents

- [makeInterceptorSucceed](#makeinterceptorsucceedinterceptor-config)
- [makeInterceptorFail](#makeinterceptorfailinterceptor-config)

## makeInterceptorSucceed(interceptor, config?)

#### Parameters

- interceptor
  - type: `HttpInterceptorFn`.
  - description: the interceptor to be tested.
- config?
  - type: `SuccessInterceptorConfig`.
  - description: the config.

#### Example

```ts
import { makeInterceptorSucceed } from 'ngx-testing-extra';

describe('AppInterceptor', () => {
  // (…) setup

  it('should intercept and add header', (done) => {
    makeInterceptorSucceed(interceptor)
      .subscribe({
        next: ({ headers }: HttpRequest<unknown>) => {
          expect(headers.get('x-test')).toEqual('test');
          done();
        },
      });
  });
});
```

## makeInterceptorFail(interceptor, config?)

#### Parameters

- interceptor
  - type: `HttpInterceptorFn`.
  - description: the inteceptor to be tested.
- config?
  - type: `ErrorInterceptorConfig`.
  - description: the config.

#### Example

```ts
import { makeInterceptorFail } from 'ngx-testing-extra';

describe('AppInterceptor', () => {
  // (…) setup

  it('should intercept and error', (done) => {
    makeInterceptorFail(interceptor, { status: 401 })
      .subscribe({
        error: ({ status }: HttpErrorResponse) => {
          expect(status).toEqual(401);
          done();
        },
      });
  });
});
```
