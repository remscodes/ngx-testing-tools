---
title: Component
---

# Component TestBed

**Quick example**

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent) // 🛠️ Create the test bed which is re-compiled for each test
    .inject('prefs', Preferences); // 🖇️ Link a key to an injection for all tests, see below 👇

  it('should render title', tb(({ component, query }) => { // 🔋 Access enhanced tools for testing components 
    expect(component.title).toEqual('app-v17');
    const span = query.findElement('.content span');
    expect(span.textContent).toContain('app-v17 app is running!');
  }));

  it('should update preferences on click', tb(({ action, injected: { prefs } }) => { // 🤯 Retrieve injections by autocompletion
    expect(prefs.approved).toBeFalse();
    action.click('#my-button');
    expect(prefs.approved).toBeTrue();
  }));
});
```

## `componentTestBed(..)`

Creates a specific test bed for component.

:::info
Works for standalone and non-standalone component.
:::

It returns a function to be used to wrap `it`'s callback and from which you access tools (check [ComponentTools](#tools)).

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  it('should ', tb((tools) => { // 👈 tb function used here
    // ... expectations
  }));
});
```

`tb` function supports the jasmine `DoneFn` and async/await notation.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

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
  const tb = componentTestBed(AppComponent, {} /* 👈 here */);

  it('should ', tb(() => {
    // ... expectations
  }));
});
```

### `imports`

**Default** : `[]`

Imports template's dependencies for the described component and its children.

:::note
It is often used for non-standalone component, because standalone component embed its own importations.
:::

Example :

```ts
const tb = componentTestBed(AppComponent, {
  imports: [SharedModule, MaterialModule],
});
```

### `providers`

**Default** : `[]`

List of providers to be available during tests for the described component and its children.

Example :

```ts
const tb = componentTestBed(AppComponent, {
  providers: [AppService, { provide: StoreService, useClass: MockStoreService }],
});
```

### `declarations`

**Default** : `[]`

List of components, directives and pipes to be used in the described **non-standalone** component template.

Example :

```ts
const tb = componentTestBed(NonStandaloneComponent, {
  declarations: [ChildComponent, AppDirective, AppPipe],
});
```

### `schemas`

**Default** : `[]`

Allows specific elements and properties to be used in the template.

See Angular [CUSTOM_ELEMENTS_SCHEMA](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA)
and [NO_ERRORS_SCHEMA](https://angular.io/api/core/NO_ERRORS_SCHEMA).

Example :

```ts
const tb = componentTestBed(AppComponent, {
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
});
```

### `noopAnimations`

**Default** : `true`

Disable Angular animation.

:::note
It provides `provideNoopAnimation()` under the hood.
:::

### `startDetectChanges`

**Default** : `true`

Runs component `fixture.detectChanges()` before each assertion.

Has no effect if [noTemplate](#notemplate) is `true`.

### `noTemplate`

**Default** : `false`

Useful when you only want to test the logic of the described component.

If enabled, no template will be rendered and no change detections will be performed.

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

It checks if the provided described instance is truthy.

## Tools

The tb function provides `ComponentTools`.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  it('should ', tb((tools /* 👈 here */) => {
    // ... expectations
  }));
});
```

`ComponentTools` extends **[BaseTools](../common/base-tools)**, **[RendererTools](../common/renderer-tools)** and **[HttpTestingTools](../common/http-testing-tools)**.

### `component`

The described component instance.

:::info
The instance is typed according to the passed component `Type<T>` in `componentTestBed(..)`.
:::

Example :

```ts
it('should ', tb(({ component }) => {
  expect(component.prop).toEqual('foo');
}));
```

### `fixture`

The described component fixture.

Example :

```ts
it('should ', tb(({ fixture, component }) => {
  component.prop = 'bar';
  fixture.detectChanges();
  expect(component.prop).toEqual('bar');
}));
```

### `element`

The described component native element.

:::info
It is the real `HTMLElement` without the wrapper "\<div id="rootXX" ng-version="X.X.X"\>...\</div\>"
:::

:::note
Can be `undefined` if [noTemplate](#notemplate) is `false`.
:::


```ts
it('should ', tb(({ element }) => {
  // ...expectations
}));
```

## Assertion options

For specific test, you enable/disable options that override the test bed options.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  it('should ', tb((tools) => {
    // ... expectations
  }, {} /* 👈 here */));
});
```

### `startDetectChanges`

Same as [options startDetectChanges](#startdetectchanges) but **only for the current assertion**.

### `verifyHttp`

Same as [options verifyHttp](#verifyHttp) but **only for the current assertion**.

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

  it('should ', tb(({ injected: { auth } }) => {
    // ... expectations
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

### `compile()`

To be used when you need to do third party setups before compiling the custom test bed.

**It has to be used into `beforeEach(..)` and [autoCompile](#autocompile) must be set to `false`.**

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent, { autoCompile: false });

  beforeEach(async () => {
    // ... third party setup
    await tb.compile();
  });
});
```
