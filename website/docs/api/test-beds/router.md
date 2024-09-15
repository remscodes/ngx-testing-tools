---
title: Router
---

# Router TestBed

Custom test bed for testing router.

**Quick example**

```ts
const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'doc', component: DocComponent },
  {
    path: 'admin',
    canActivate: [() => inject(AuthService).isAdmin],
    component: AdminComponent,
  },
];

describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES, { initialUrl: 'home' })
    .provide(AuthService)
    .inject('auth', AuthService);

  it('should navigate to doc page', tb(async ({ $url, navigateByUrl }) => {
    expect($url()).toEqual('/home'); // expect equal to initialUrl

    await navigateByUrl('doc');

    expect($url()).toEqual('/doc');
  }));

  it('should not navigate to admin page', tb(async ({ $url, navigateByUrl }) => {
    await navigateByUrl('admin');

    expect($url()).toEqual('/home'); // expect guard to reject, so navigation end to current url
  }));

  it('should navigate to admin page', tb(async ({ $url, navigateByUrl, injected: { auth } }) => {
    auth.isAdmin = true;

    await navigateByUrl('admin');

    expect($url()).toEqual('/admin'); // expect guard to pass
  }));
});
```

## `routerTestBed(..)`

Creates a specific test bed for router.

It returns a function to be used to wrap `it`'s callback and from which you access tools (check [RouterTools](#assertion-tools)).

```ts
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES);

  it('should ', tb((tools) => { // 👈 tb function used here
    // ... expectations
  }));
});
```

`tb` function supports the jasmine `DoneFn` and async/await notation.

```ts
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES);

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
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES, {} /* 👈 here */);

  it('should ', tb(() => {
    // ... expectations
  }));
});
```

### `initialUrl`

**Default** : `''`

Initialize the described router url.

Example :

```ts
const tb = routerTestBed(APP_ROUTES, { initialUrl: 'home' });

it('should navigation init to /home', tb(async ({ $url, navigateByUrl }) => {
  expect($url()).toEqual('/home'); // expect equal to initialUrl
}));
```

### `startDetectChanges`

**Default** : `true`

Runs router harness `fixture.detectChanges()` before each assertion.

### `imports`

**Default** : `[]`

Imports dependencies for the described router.

Example :

```ts
const tb = routerTestBed(APP_ROUTES, {
  imports: [AppModule, SharedModule],
});
```

### `providers`

**Default** : `[]`

List of providers to be available during tests for the described router.

Example :

```ts
const tb = routerTestBed(APP_ROUTES, {
  providers: [AppService, { provide: StoreService, useClass: MockStoreService }],
});
```

### `autoCompile`

**Default** : `true`

Automatically compiles the custom test bed for each test.

### `checkCreate`

**Default** : `true`

Automatically invokes the "should create" Angular test.

It checks if the provided described instance is truthy.

## Assertion tools

The tb function provides `RouterTools`.

```ts
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES);

  it('should ', tb((tools /* 👈 here */) => {
    // ... expectations
  }));
});
```

👉 `RouterTools` extends **[BaseTools](../common/base-tools)**.

### `routes`

The described router routes.

Example :

```ts
it('should ', tb(({ routes }) => {
  expect(routes.length).toEqual(2);
}));
```

### `$url`

The current router url as a [`Signal`](https://angular.dev/guide/signals).

Example :

```ts
it('should ', tb(({ $url }) => {
  expect($url()).toEqual('/home');
}));
```

### `harness`

Angular [`RouterTestingHarness`](https://angular.dev/api/router/testing/RouterTestingHarness).

Example :

```ts
it('should ', tb(({ harness }) => {
  // ... expectations
}));
```

### `navigateByUrl`

Proxy of [`RouterTestingHarness.navigateByUrl`](https://angular.dev/api/router/testing/RouterTestingHarness#navigateByUrl)

Example :

```ts
it('should ', tb(async ({ navigateByUrl }) => {
  await navigateByUrl('admin');
  // ... expectations
}));
```

## Assertion options

For specific test, you enable/disable options that override the test bed options.

```ts
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES);

  it('should ', tb((tools) => {
    // ... expectations
  }, {} /* 👈 here */));
});
```

### `startDetectChanges`

Same as [options startDetectChanges](#startdetectchanges) but **only for the current assertion**.

## `RouterTestBed`

### `import(..)`

Same as [options imports](#imports) but with chaining methods.

Example :

```ts
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES)
    .import(AppModule)
    .import([SharedModule, ThirdPartyModule]);
});
```

### `provide(..)`

Same as [options providers](#providers) but with chaining methods.

Example :

```ts
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES)
    .provide(AppService)
    .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
});
```

### `inject(..)`

Links an injected instance to a key and retrieve it into the enhanced tools by autocompletion.

```ts
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES)
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
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES);

  beforeEach(tb.setup(async ({ navigateByUrl }) => {
    await navigateByUrl('doc');
  }));
});
```

### `compile()`

To be used when you need to do third party setups before compiling the custom test bed.

:::warning
It has to be used into `beforeEach(..)` and [autoCompile](#autocompile) must be set to `false`.
:::

```ts
describe('App Routes', () => {
  const tb = routerTestBed(APP_ROUTES, { autoCompile: false });

  beforeEach(async () => {
    // ... third party setup
    await tb.compile();
  });
});
```
