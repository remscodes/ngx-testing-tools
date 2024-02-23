# Component TestBed

### Usage

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  it('should do something', tb(() => {
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

#### ComponentTestBed Tools

#### ComponentTools

```ts
{
  // The described component fixture.
  fixture: ComponentFixture<T>;
  // The described component instance.
  component: T;
  // Enhanced tools to query elements (see below).
  query: ComponentQueryTools;
  // Enhanced tools to perform action on elements (see below).
  action: ComponentActionTools;
}
```

Check common tools :

- [BaseTools](#basetools)
- [HttpTestingTools](#httptestingtools)
