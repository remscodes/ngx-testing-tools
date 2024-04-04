---
title: Pipe
---

# Pipe TestBed

**Quick example**

```ts
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe);

  it('should transform values', tb(({ verify }) => {
    verify({ data: 'format', parameters: ['my-'], expected: 'my-format' });

    verify.many([
      { data: 'format', parameters: ['a-'], expected: 'a-format' },
      { data: 'format', parameters: ['a-', '-b'], expected: 'a-format-b' },
    ]);
  }));
});
```

## `pipeTestBed(..)`

Creates a specific test bed for pipe.

:::info
Works for standalone and non-standalone pipe.
:::

It returns a function to be used to wrap `it`'s callback and from which you access tools (check [PipeTools](#tools)).

```ts
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe);

  it('should ', tb((tools) => { // <-- tb function used here
    // ... expectations
  }));
});
```

`tb` function supports the jasmine `DoneFn` and async/await notation.

```ts
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe);

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
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe, {} /* <- here */);

  it('should ', tb(() => {
    // ... expectations
  }));
});
```

### `imports`

**Default** : `[]`

Imports dependencies for the described pipe.

:::note
It is often used for non-standalone pipe, because standalone pipe embed its own importations.
:::

Example :

```ts
const tb = pipeTestBed(AppPipe, {
  imports: [SharedModule, MaterialModule],
});
```

### `providers`

**Default** : `[]`

List of providers to be available during tests for the described pipe.

Example :

```ts
const tb = pipeTestBed(AppPipe, {
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

The tb function provides `PipeTools`.

```ts
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe);

  it('should ', tb((tools /* <- here */) => {
    // ... expectations
  }));
});
```

`PipeTools` extends **[BaseTools](../common/base-tools)**.

### `pipe`

The described pipe instance.

:::info
The instance is typed according to the passed pipe `Type<T>` in `pipeTestBed(..)`.
:::

Example :

```ts
it('should ', tb(({ pipe }) => {
  expect(pipe.prop).toEqual('foo');
}));
```

### `verify`

Verifies pipe `transform` with passed data and parameters.

Example :

```ts
it('should transform values', tb(({ verify }) => {
  verify({ data: 'format', parameters: ['my-'], expected: 'my-format' });

  verify.many([
    { data: 'format', parameters: ['a-'], expected: 'a-format' },
    { data: 'format', parameters: ['a-', '-b'], expected: 'a-format-b' },
  ]);
}));
```

## `PipeTestBed`

### `import(..)`

Same as [options imports](#imports) but with chaining methods.

Example :

```ts
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe)
    .import(SharedModule)
    .import([ThirdPartyModule, MaterialModule]);
});
```

### `provide(..)`

Same as [options providers](#providers) but with chaining methods.

Example :

```ts
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe)
    .provide(NotifService)
    .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
});
```

### `inject(..)`

Links an injected instance to a key and retrieve it into the enhanced tools by autocompletion.

```ts
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe)
    .inject('auth', AuthService);

  it('should ', tb(({ injected: { auth } }) => {
    // ... expectations
  }));
});
```

### `setup(..)`

Setups extra action using the enhanced tools.

Works only for `beforeEach` and `afterEach`.

Example :

```ts
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe);

  beforeEach(tb.setup(({ pipe }) => {
    pipe.foo = true;
  }));
});
```

### `compile(..)`

To be used when you need to do third party setups before compiling the custom test bed.

**It has to be used into `beforeEach(..)` and [autoCompile](#autocompile) must be set to `false`.**

```ts
describe('AppPipe', () => {
  const tb = pipeTestBed(AppPipe, { autoCompile: false });

  beforeEach(async () => {
    // ... third party setup
    await tb.compile();
  });
});
```
