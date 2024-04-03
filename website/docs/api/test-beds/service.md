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

Enables [HttpTestingTools](#http).

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

Each custom test bed has it own tools related to what is tested.
