# Component TestBed

**Quick Example**

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

> Works for standalone and non-standalone components.

It returns a function to be used to wrap `it`'s callback and from which you access tools ([see below](#tools)).

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  it('should do something', tb((tools) => { // <-- tb function used here
    // ... expectations
  }));
});
```

`tb` function supports the jasmine `DoneFn` and async/await notation.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

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
  const tb = componentTestBed(AppComponent, {
    // ... options (see below)
  });

  it('should do something', tb(() => {
    // ... expectations
  }));
});
```

### `imports`

**Default** : `[]`

Imports template's dependencies for the described component and its children.

It is often used for non-standalone component, because standalone component embed its own importations.

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

Check `NO_ERRORS_SCHEMA` and `CUSTOM_ELEMENTS_SCHEMA`.

Example :

```ts
const tb = componentTestBed(AppComponent, {
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
});
```

### `noopAnimations`

**Default** : `true`

Disable Angular animation.

> It provides `provideNoopAnimation()` under the hood.

### `startDetectChanges`

**Default** : `true`

Runs component `fixture.detectChanges()` before each assertion.

### `noTemplate`

**Default** : `false`

Useful when you only want to test the logic of the described component.

If enabled, no template will be rendered and no change detections will be performed.

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

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  it('should do something', tb((tools /* <- tools here */) => {
    // ... expectations
  }));
});
```

ComponentTools extends [BaseTools](#basetools).

### `component`

The described component instance.

> The instance is typed according to the passed component Type\<T\> in `componentTestBed`.

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

Example :

```ts
it('should ', tb(({ element }) => {

}));
```

### `query`

Enhanced tools to query elements. Check

Example :

```ts
it('should ', tb(({ query }) => {

}));
```

### `action`

Enhanced tools to perform action on elements. Check

Example :

```ts
it('should ', tb(({ action }) => {

}));
```

### `http`

Only if `httpTesting` is `true`.

Check [HttpTools](#httptestingtools)

## Tools options

For specific test, you enable/disable options that override the test bed options.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  it('should do something', tb((tools) => {
    // ... expectations
  }, {} /* <- options here */));
});
```

### `startDetectChanges`

**Default** : `true`

Runs component `fixture.detectChanges()` before this assertion.

### `verifyHttp`

**Default** : `true`

When enabled, this assertion will end by HttpTestingController.verify().

Works only when `httpTesting` is `true`, otherwise has no effect.

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
    // (…) specific setup
    await tb.compile();
  });
});
```
