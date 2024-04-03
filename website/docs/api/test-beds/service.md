# Service

**Quick Example**

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService, { httpTesting: true }); // 🛠️ Create the test bed and enable http testing

  it('should fetch cat fact', tb(({ service, http, rx }, done) => {
    const mockRes = { fact: 'string', length: 6 };

    rx.remind = service.getCatFact().subscribe({ // 🧯 Use rx.remind to auto unsubscribe after the end of the test
      next: (res) => {
        expect(res).toEqual(mockRes);
        done();
      },
    });

    http.emitSuccessResponse({ url: service.CAT_FACT_URL, body: mockRes }); // 🎭 Fake the http response of the request that matches the url
  }));
});
```

## `serviceTestBed(..)`

Creates a specific test bed for service.

It returns a function to be used to wrap `it`'s callback and from which you access tools ([check Tools](#tools)).

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService);

  it('should do something', tb((tools) => { // <-- tb function used here
    // ... expectations
  }));
});
```

`tb` function supports the jasmine `DoneFn` and async/await notation.

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService);

  it('should do something', tb(async (tools) => {
    // ... async expectations
  }));

  it('should do something', tb((tools, done) => {
    // ... expectations
    done();
  }));
});
```

## Options

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent, {} /* <- options here */);

  it('should do something', tb(() => {
    // ... expectations
  }));
});
```

### `imports`

**Default** : `[]`

Imports template's dependencies for the described service and its children.

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

Works only when [httpTesting](#httptesting) is `true`, otherwise has no effect.

### `autoCompile`

**Default** : `true`

Automatically compiles the custom test bed for each test.

### `checkCreate`

**Default** : `true`

Automatically invokes the "should create" angular test.

It checks if the provided `described` instance is truthy.

## Tools

The tb function provides tools.

```ts
describe('AppService', () => {
  const tb = serviceTestBed(AppService);

  it('should ', tb((tools /* <- tools here */) => {
    // ... expectations
  }));
});
```

ServiceTools extends [BaseTools](../common/base-tools) and [HttpTestingTools](../common/http-testing-tools).

### `service`

The described service instance.

> The instance is typed according to the passed service Type\<T\> in `serviceTestBed`.

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

  it('should do something', tb((tools) => {
    // ... expectations
  }, {} /* <- options here */));
});
```

### `verifyHttp`

Same as [options verifyHttp](#verifyhttp) but **only for the current assertion**.

## `ComponentTestBed`

### `import(..)`

Same as [options imports](#imports) but with chaining methods.

Example :

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .import(SharedModule)
    .import([ThirdPartyModule, MaterialModule]);
});
```

### `provide(..)`

Same as [options providers](#providers) but with chaining methods.

Example :

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .provide(AppService)
    .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
});
```

### `declare(..)`

Same as [options declarations](#declarations) but with chaining methods.

Example :

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .declare(ChildComponent)
    .declare([HeaderComponent, AppPipe]);
});
```

### `inject(..)`

Links an injected instance to a key and retrieve it into the enhanced tools by autocompletion.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .inject('auth', AuthService);

  it('should do something', tb(({ injected: { auth } }) => {
    // (…) expectations
  }));
});
```

### `setup(..)`

Setups extra action using the enhanced tools.

Works only for `beforeEach` and `afterEach`.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  beforeEach(tb.setup(({ component }) => {
    component.myInput = true;
  }));
});
```

### `compile(..)`

To be used when you need to do third party setups before compiling the custom test bed.

**It has to be used into `beforeEach()` setup and autoCompile must be set to false.**

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent, { autoCompile: false });

  beforeEach(async () => {
    // (…) third party setup
    await tb.compile();
  });
});
```
