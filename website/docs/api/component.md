# Component TestBed

## `componentTestBed(..)`

Creates a specific test bed for component.

> Works for standalone and non-standalone components.

It returns a function that wraps `it`'s callback and from which you access tools ([see below](#tools)).

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  it('should do something', tb(() => { // <-- tb function used here
    // ... expectations
  }));
});
```

## Options

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent, {
    // ... options (see below)
  });
});
```

### `imports`

**Default** : `[]`

Imports template's dependencies for the described component and its children.

It is often used for non-standalone component, because standalone component embed its own importations.

Example :

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent, {
    imports: [SharedModule, NonStandaloneComponent],
  });
});
```

### `providers`

List of providers to be available during tests for the described component and its children.

### `declarations`

### `schemas`

### `noopAnimations`

Disable Angular animation during tests.

Default to `true`.

> It provides `provideNoopAnimation()` under the hood.

### `startDetectChanges`

Options :

[//]: # (@formatter:off)
```ts
{
  imports?: Importation[] = [];
  providers?: AnyProvider[] = [];
  declarations?: Declaration[] = [];
  schemas?: SchemaMetadata[] = [];
  // Disables Angular animations with `provideNoopAnimations()`.
  noopAnimations?: boolean = true;
  // Run component fixture `detectChanges()` before assertion.
  startDetectChanges?: boolean = true;
  // Useful when you only want to test the logic of the described component.
  // If enabled, no template will be rendered and no change detections will be performed.
  noTemplate?: boolean = false;
  // Enables `HttpTools`.
  httpTesting?: boolean = false;
  // When enabled, the assertion will end by `HttpTestingController.verify()`.
  // Works only when `httpTesting` test bed option is `true`, otherwise has no effect.
  verifyHttp?: boolean = true;
  // Automatically compiles the custom test bed for each test.
  autoCompile?: boolean = true;
  // Automatically invokes the "should create" test.
  // It checks if the provided `described` instance is truthy. 
  checkCreate?: boolean = true;
}
```
[//]: # (@formatter:on)

#### ComponentTestBed Definitions

Check common definitions :

- [tb.import(..)](#importoneormanyimports---basetestbed)
- [tb.provide(..)](#provideoneormanyproviders---basetestbed)
- [tb.declare(..)](#declareoneormanydeclarations---renderertestbed)
- [tb.inject(..)](#injectname-token---basetestbed)
- [tb.setup(..)](#setupaction---jasmineimplementationcallback)
- [tb.compile(..)](#compile---promisevoid)

#### (assertion, options?) -> jasmine.ImplementationCallback

Options :

[//]: # (@formatter:off)
```ts
{
  // Run component fixture `detectChanges()` before assertion.
  startDetectChanges?: boolean = true;
  // When enabled, the assertion will end by `HttpTestingController.verify()`.
  // Works only when `httpTesting` test bed option is `true`, otherwise has no effect.
  verifyHttp?: boolean = true;
}
```
[//]: # (@formatter:on)

Check examples : [tb(..)](#assertion-options---jasmineimplementationcallback-2).

Examples :

```ts
it('should do something', tb(({ component, fixture, injector, action, query }) => {
  component.myInput = true;
  fixture.detectChanges();

  const auth = injector.get(AuthService);

  const inner = query.findComponent(InnerComponent);

  action.click('#my-button');

  // (…) expectations
}, { startDetectChanges: false })); 
```

```ts
it('should do something', tb(({ component }, done) => {
  // (…) expectations
  done();
})); 
```

```ts
it('should do something', tb(async ({ component }) => {
  // (…) async expectations 
})); 
```

## Tools

### component

The described component instance.

> The instance is typed according to the passed component Type\<T\> in `componentTestBed`.

```ts
it('should ', tb(({ component }) => {
  expect(component.prop).toEqual('foo');
}));
```

### fixture

The described component fixture.

```ts
it('should ', tb(({ fixture, component }) => {
  component.prop = 'bar';
  fixture.detectChanges();
  expect(component.prop).toEqual('bar');
}));
```

### element

The described component native element.

### query

Enhanced tools to query elements (see below).

### action

Enhanced tools to perform action on elements (see below).

### http

Only if `httpTesting` is `true`.

Check common tools :

- [BaseTools](#basetools)
- [HttpTestingTools](#httptestingtools)
