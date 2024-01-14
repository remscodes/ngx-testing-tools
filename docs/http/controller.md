# HTTP response

## Table of contents

- [emitFakeSuccessResponse(…)](#emitfakesuccessresponsehttpcontroller-config)
- [emitFakeErrorResponse(…)](#emitfakeerrorresponsehttpcontroller-config)
- [expectHttpRequest(…)](#expecthttprequesthttpcontroller-config)

## emitFakeSuccessResponse(httpController, config)

Expects the specified request (by url and method) and emits a fake success http response.

#### Parameters

- httpController
  - type: `HttpTestingController`.
  - description: the injected `HttpTestingController`.
- config
  - type: `SuccessResponseConfig`.
  - description: the config.

#### Example

```ts
import { emitFakeSuccessResponse } from 'ngx-testing-extra';

describe('AppService', () => {
  // (…) setup

  it('should get info', (done) => {
    const mockInfo = { name: 'John DOE' };

    appService
      .getRemoteInfo()
      .subscribe({
        next: (res) => {
          expect(res).toEqual(mockInfo);
          done();
        },
      });

    emitFakeSuccessResponse(httpController, {
      url: '/info',
      method: 'GET',
      body: mockInfo,
    });

    httpController.verify();
  });
});
```

## emitFakeErrorResponse(httpController, config)

Expects the specified request (by url and method) and emits a fake error http response.

#### Parameters

- httpController
  - type: `HttpTestingController`.
  - description: the injected `HttpTestingController`.
- config
  - type: `ErrorResponseConfig`.
  - description: the config.

#### Examples

```ts
import { emitFakeErrorResponse } from 'ngx-testing-extra';

describe('AppService', () => {
  // (…) setup

  it('should get an error', (done) => {
    const mockInfo = { name: 'John DOE' };

    appService
      .getRemoteInfo()
      .subscribe({
        error: ({ status }) => {
          expect(status).toEqual(401);
          done();
        },
      });

    emitFakeErrorResponse(httpController, {
      url: '/',
      method: 'GET',
      status: 401,
    });

    httpController.verify();
  });
});
```

## expectHttpRequest(httpController, config)

Expects one request by url and method.

Returns the expected `TestRequest`.

#### Parameters

- httpController
  - type: `HttpTestingController`.
  - description: the injected `HttpTestingController`.
- config
  - type: `ExpectRequestConfig`.
  - description: this config.

#### Example

```ts
import { expectHttpRequest } from 'ngx-testing-extra';

describe('AppService', () => {
  // (…) setup

  it('should expectHttpRequest', (done) => {
    appService
      .getRemoteInfo()
      .subscribe();

    expectHttpRequest(httpController, {
      url: '/',
      method: 'GET',
    });

    expect().nothing();
    done();
  });
});
```
