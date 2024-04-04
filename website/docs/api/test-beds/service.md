---
title: Service
---

# Service TestBed

**Quick example**

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService, { httpTesting: true }); // 🛠️ Create the test bed and enable http testing

  it('should fetch cat fact', tb(({ service, http, rx }, done) => {
    const mockBody = { fact: 'string', length: 6 };

    rx.remind = service.getCatFact().subscribe({ // 🧯 Use rx.remind to auto unsubscribe after the end of the test
      next: (res) => {
        expect(res).toEqual(mockBody);
        done();
      },
    });

    http.emitSuccessResponse({ url: service.CAT_FACT_URL, body: mockBody }); // 🎭 Fake the http response of the request that matches the url
  }));
});
```

## `serviceTestBed(..)`

Creates a specific test bed for service.

It returns a function to be used to wrap `it`'s callback and from which you access tools (check [ServiveTools](#tools)).

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService);

  it('should ', tb((tools) => { // <-- tb function used here
    // ... expectations
  }));
});
```

`tb` function supports the jasmine `DoneFn` and async/await notation.

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService);

  it('should ', tb(async (tools) => {
    // ... async expectations
  }));

  it('should ', tb((tools, done) => {
    // ... expectations
    done();
  }));
});
```

## TestBed Options

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent, {} /* <- here */);

  it('should ', tb(() => {
    // ... expectations
  }));
});
```

### `imports`

**Default** : `[]`

Imports dependencies for the described service.

It is often used for non-standalone component, because standalone component embed its own importations.

Example :

```ts
const tb = serviceTestBed(AppService, {
  imports: [SharedModule, MaterialModule],
});
```

### `providers`

**Default** : `[]`

List of providers to be available during tests for the described service.

Example :

```ts
const tb = serviceTestBed(AppService, {
  providers: [AuthService, { provide: StoreService, useClass: MockStoreService }],
});
```

### `httpTesting`

**Default** : `false`

Enables [HttpTestingTools](../common/http-testing-tools).

### `verifyHttp`

**Default** : `true`

When enabled, each assertion will end by `HttpTestingController.verify()`.

:::warning
Works only if [httpTesting](#httptesting) is `true`, otherwise has no effect.
:::

### `autoCompile`

**Default** : `true`

Automatically compiles the custom test bed for each test.

### `checkCreate`

**Default** : `true`

Automatically invokes the "should create" Angular test.

It checks if the provided `described` instance is truthy.

## Tools

The tb function provides `ServiceTools`.

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService);

  it('should ', tb((tools /* <- here */) => {
    // ... expectations
  }));
});
```

`ServiceTools` extends **[BaseTools](../common/base-tools)** and **[HttpTestingTools](../common/http-testing-tools)**.

### `service`

The described service instance.

:::info
The instance is typed according to the passed service `Type<T>` in `serviceTestBed(..)`.
:::

Example :

```ts
it('should ', tb(({ service }) => {
  expect(service.prop).toEqual('foo');
}));
```

## Tools Options

For specific test, you enable/disable options that override the test bed options.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  it('should ', tb((tools) => {
    // ... expectations
  }, {} /* <- options here */));
});
```

### `verifyHttp`

Same as [options verifyHttp](#verifyhttp) but **only for the current assertion**.

## `ServiceTestBed`

### `import(..)`

Same as [options imports](#imports) but with chaining methods.

Example :

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService)
    .import(SharedModule)
    .import([ThirdPartyModule, MaterialModule]);
});
```

### `provide(..)`

Same as [options providers](#providers) but with chaining methods.

Example :

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService)
    .provide(NotifService)
    .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
});
```

### `inject(..)`

Links an injected instance to a key and retrieve it into the enhanced tools by autocompletion.

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService)
    .inject('auth', AuthService);

  it('should ', tb(({ injected: { auth } }) => {
    // ... expectations
  }));
});
```

### `setup(..)`

Setups extra action using the enhanced tools.

Works only for `beforeEach` and `afterEach`.

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService);

  beforeEach(tb.setup(({ service }) => {
    service.foo = true;
  }));
});
```

### `compile(..)`

To be used when you need to do third party setups before compiling the custom test bed.

**It has to be used into `beforeEach(..)` and [autoCompile](#autocompile) must be set to `false`.**

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService, { autoCompile: false });

  beforeEach(async () => {
    // ... third party setup
    await tb.compile();
  });
});
```
