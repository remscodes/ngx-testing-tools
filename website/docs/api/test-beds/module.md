---
title: Module
---

# Module TestBed

**Quick example**

```ts
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule);

  it('should provide AppService', tb(({ injector }) => {
    const appService = injector.get(AppService);
    expect(appService).toBeTruthy();
  }));
});
```

## `moduleTestBed(..)`

Creates a specific test bed for module.

It returns a function to be used to wrap `it`'s callback and from which you access tools (check [ModuleTools](#tools)).

```ts
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule);

  it('should ', tb((tools) => { // <-- tb function used here
    // ... expectations
  }));
});
```

`tb` function supports the jasmine `DoneFn` and async/await notation.

```ts
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule);

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
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule, {} /* <- options here */);

  it('should ', tb(() => {
    // ... expectations
  }));
});
```

### `imports`

**Default** : `[]`

Imports dependencies for the described module.

Example :

```ts
const tb = moduleTestBed(AppModule, {
  imports: [SharedModule, MaterialModule],
});
```

### `providers`

**Default** : `[]`

List of providers to be available during tests for the described module.

Example :

```ts
const tb = moduleTestBed(AppModule, {
  providers: [AuthService, { provide: StoreService, useClass: MockStoreService }],
});
```

### `autoCompile`

**Default** : `true`

Automatically compiles the custom test bed for each test.

### `checkCreate`

**Default** : `true`

Automatically invokes the "should create" Angular test.

It checks if the provided `described` instance is truthy.

## Tools

The tb function provides `ModuleTools`.

```ts
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule);

  it('should ', tb((tools /* <- here */) => {
    // ... expectations
  }));
});
```

`ModuleTools` extends **[BaseTools](../common/base-tools)**.

### `module`

The described module instance.

:::info
The instance is typed according to the passed module `Type<T>` in `moduleTestBed(..)`.
:::

Example :

```ts
it('should ', tb(({ module }) => {
  expect(module.prop).toEqual('foo');
}));
```

## `ModuleTestBed`

### `import(..)`

Same as [options imports](#imports) but with chaining methods.

Example :

```ts
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule)
    .import(SharedModule)
    .import([ThirdPartyModule, MaterialModule]);
});
```

### `provide(..)`

Same as [options providers](#providers) but with chaining methods.

Example :

```ts
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule)
    .provide(NotifService)
    .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
});
```

### `inject(..)`

Links an injected instance to a key and retrieve it into the enhanced tools by autocompletion.

```ts
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule)
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
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule);

  beforeEach(tb.setup(({ module }) => {
    module.foo = true;
  }));
});
```

### `compile(..)`

To be used when you need to do third party setups before compiling the custom test bed.

**It has to be used into `beforeEach(..)` and [autoCompile](#autocompile) must be set to `false`.**

```ts
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule, { autoCompile: false });

  beforeEach(async () => {
    // ... third party setup
    await tb.compile();
  });
});
```
