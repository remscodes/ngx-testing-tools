<div align="center">
    <h1>Angular Testing Tools</h1>
    <p>Makes Angular testing easier</p>
</div> 

<div align="center">

[![github ci](https://img.shields.io/github/actions/workflow/status/remscodes/ngx-testing-tools/npm-ci.yml.svg?logo=github&label=CI&style=for-the-badge)](https://github.com/remscodes/ngx-testing-tools/actions/workflows/npm-ci.yml)
[![codecov coverage](https://img.shields.io/codecov/c/github/remscodes/ngx-testing-tools/main.svg?style=for-the-badge&logo=codecov)](https://codecov.io/gh/remscodes/ngx-testing-tools)
[![npm version](https://img.shields.io/npm/v/ngx-testing-tools.svg?style=for-the-badge&logo=npm)](https://www.npmjs.org/package/ngx-testing-tools)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ngx-testing-tools.svg?style=for-the-badge)](https://bundlephobia.com/package/ngx-testing-tools)
[![license](https://img.shields.io/github/license/remscodes/ngx-testing-tools.svg?style=for-the-badge)](LICENSE)

</div>

## In a nutshell

This library aims to **reduce boilerplate** 😎 and **provides high-level tools**️ 🔥 for testing Component, Service, Router and everything else related to the Angular mechanism.

It makes tests **easier to read** 😌 and **faster to write** ⚡️!

## Quick examples

#### Testing Component

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

🫡 (The redundant "should create" test is even called up for you!)

#### Testing Service

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

## Installation

```shell
npm install -D ngx-testing-tools
```

## Table of contents

- Custom test beds 🤩
  - [ComponentTestBed](#componenttestbed)
  - [ServiceTestBed](#servicetestbed)
  - [ModuleTestBed](#moduletestbed)

- Common enhanced tools 🔋
  - [BaseTools](#basetools)
  - [HttpTestingTools](#httptestingtools)

- External utilities 🔧
  - Router
    - [Guard]()
    - [Resolver]()
  - Http
    - [Interceptor]()
  - Pipe
    - [Expect values]()

## Custom test beds

All custom test beds significantly reduce the boilerplate required to perform tests and provide enhanced tools.

### ComponentTestBed

- [Options](#componenttestbed-options)
- Definitions
  - [tb.import(..)](#importoneormanyimports---componenttestbed)
  - [tb.provide(..)](#provideoneormanyproviders---componenttestbed)
  - [tb.declare(..)](#declareoneormanydeclarations---componenttestbed)
  - [tb.inject(..)](#injectname-token---componenttestbed)
  - [tb(..)](#assertion-options---jasmineimplementationcallback)
  - [tb.setup(..)](#setupaction---jasmineimplementationcallback)
  - [tb.compile()](#compile---promisevoid)
- Tools
  - [ComponentTools](#componenttools)
  - [ComponentQueryTools](#componentquerytools)
  - [ComponentActionTools](#componentactiontools)

#### ComponentTestBed Options

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
  // Automatically compiles the custom test bed for each test.
  autoCompile?: boolean = true;
  // Automatically invokes the "should create" test.
  // It checks if the provided `described` instance is truthy. 
  checkCreate?: boolean = true;
  // Enables `HttpTools`.
  httpTesting?: boolean = false;
  // Disables Angular animations with `provideNoopAnimations()`.
  noopAnimations?: boolean = true;
  // Run component fixture `detectChanges()` before assertion.
  startDetectChanges?: boolean = true;
  // Useful when you only want to test the logic of the described component.
  // If enabled, no template will be rendered and no change detections will be performed.
  noTemplate?: boolean = false;
}
```
[//]: # (@formatter:on)

#### import(oneOrManyImports) -> ComponentTestBed

Imports required module(s) and standalone component(s) into testing module for your current tests.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .import(SharedModule)
    .import([StandaloneComponent, MaterialModule]);
});
```

#### provide(oneOrManyProviders) -> ComponentTestBed

Provides required injectable service(s) or other(s) provider(s) into testing module for your current tests.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .provide(AppService)
    .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
});
```

#### declare(oneOrManyDeclarations) -> ComponentTestBed

Declares required non-standalone component(s), directive(s) and pipe(s) into testing module for your current tests.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .declare(AppFirstComponent)
    .declare([AppSecondComponent, AppPipe]);
});
```

#### inject(name, token) -> ComponentTestBed

Links an injected instance to a key and retrieve it into the enhanced tools by autocompletion.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .inject('auth', AuthService)

  it('should do something', tb(({ injected: { auth } }) => {
    // (…) expectations
  }));
});
```

#### (assertion, options?) -> jasmine.ImplementationCallback

Wraps the `it` assertion function and provides enhanced tools for testing component expectations.

It supports the jasmine `DoneFn` and `async`/`await` (check examples below).

It automatically starts the assertion by running `fixture.detectChanges()` (can be disabled, check options below).

```ts
it('should do something', tb(({ component, fixture, injector, action, query }) => {
  component.myInput = true;
  fixture.detectChanges();

  const appService = injector.get(AppService);

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

#### setup(action) -> jasmine.ImplementationCallback

Setups extra action using the `ComponentTestBed` enhanced tools.

Works only for `beforeEach` and `afterEach`.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);

  beforeEach(tb.setup(({ component }) => {
    component.myInput = true;
  }));

  it('should do something', tb(({ component }) => {
    // (…) expectations
  }));
});
```

#### compile() -> Promise\<void\>

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

-> It extends [BaseTools](#basetools) and [HttpTestingTools](#httptestingtools).

#### ComponentQueryTools

- [findComponent](#findcomponentselectorordirective---t)
- [findAllComponents](#findallcomponentsselectorordirective---t)
- [findElement](#findelementselectorordirective---htmlelement)
- [findAllElements](#findallelementsselectorordirective---htmlelement)
- [findDebugElement](#finddebugelementselectorordirective---debugelement)
- [findAllDebugElements](#findalldebugelementsselectorordirective---debugelement)

##### findComponent(selectorOrDirective) -> T

Returns the first component instance found with the provided CSS selector or directive.

Throws an Error if not found.

> /!\ Querying native element (ex: button, span, etc...) that is not an Angular component will return the hosted component instance instead.

```ts
it('should do something', tb(({ query }) => {
  const inner = query.findComponent(InnerComponent);
  const scanner = query.findComponent('app-scanner');
  // (…) expectations
}));
```

##### findAllComponents(selectorOrDirective) -> T[]

Returns an array of all component instances found with the provided CSS selector or directive.

Throws an Error if not found.

> /!\ Querying native element (ex: button, span, etc...) that is not an Angular component will return the hosted component instance instead.

```ts
it('should do something', tb(({ query }) => {
  const inners = query.findAllComponents(InnerComponent);
  const cards = query.findAllComponents('app-card');
  // (…) expectations
})); 
```

##### findElement(selectorOrDirective) -> HTMLElement

Return the first native element (that extends `HTMLElement`) with by the provided CSS selector or directive.

Throws an Error if not found.

```ts
it('should do something', tb(({ query }) => {
  const inner = query.findElement(InnerComponent);
  const button = query.findElement<HTMLButtonElement>('#my-button');
  // (…) expectations
}));
```

##### findAllElements(selectorOrDirective) -> HTMLElement[]

Returns an array of all native elements that extends `HTMLElement` found by the provided CSS selector or directive.

Throws an Error if not found.

```ts
it('should do something', tb(({ query }) => {
  const inners = query.findAllElements(InnerComponent);
  const buttons = query.findAllElements<HTMLButtonElement>('button');
  // (…) expectations
}));
```

##### findDebugElement(selectorOrDirective) -> DebugElement

Returns the first debug element found with the provided CSS selector or directive.

Throws an Error if not found.

```ts
it('should do something', tb(({ query }) => {
  const innerDebug = query.findDebugElement(InnerComponent);
  const buttonDebug = query.findDebugElement('#my-button');
  // (…) expectations
}));
```

##### findAllDebugElements(selectorOrDirective) -> DebugElement[]

Returns an array of all debug elements found with the provided CSS selector or directive.

Throws an Error if not found.

```ts
it('should do something', tb(({ query }) => {
  const innerDebugs = query.findAllDebugElements(InnerComponent);
  const buttonDebugs = query.findAllDebugElements('button');
  // (…) expectations
}));
```

#### ComponentActionTools

- [click](#clickselectorordirective)
- [emitOutput](#emitoutputselectorordirective-name-value)

##### click(selectorOrDirective)

Clicks on the element found by CSS selector or directive.

Throws an Error if not found.

```ts
it('should do something on click', tb(({ action }) => {
  // <button id="my-button" (click)="handleClick()">
  action.click('#my-button');
  // <button buttonDirective (click)="handleClick()">
  action.click(MyButtonDirective);
  // (…) expectations
})); 
```

##### emitOutput(selectorOrDirective, name, value?)

Emits output of element found by CSS selector or directive.

Throws an Error if not found.

```ts
it('should do something when output emitted', tb(({ action }) => {
  // <app-scanner (result)="barcode = $event.barcode" />
  action.emitOutput(AppScannerComponent, 'result', { barcode: '123456789' } /* 👈 $event */);
  // <div viewport (onViewport)="enable = $event">(…)</div>
  action.emitOutput(ViewportDirective, 'onViewport', true);
  // <input id="my-input" (change)="handleValue($event)" />
  action.emitOutput('#my-input', 'change', 'blablabla');
  // (…) expectations
})); 
```

### ServiceTestBed

- [Options]()


- [tb.import(..)](#importoneormanyimports---componenttestbed)
- [tb.provide(..)](#provideoneormanyproviders---componenttestbed)
- [tb.inject(..)]()
- [tb(..)]()
- [tb.setup(..)]()
- [tb.compile()]()

### ModuleTestBed

### Common definitions

####                               

## Common enhanced tools

### BaseTools

```ts
export interface BaseTools {
  /**
   * The root injector.
   */
  injector: Injector;
  /**
   * Box that automatically clears all supplied "Subscription" and "Subject".
   */
  rx: RxBox;
}
```

### HttpTestingTools

### RxBox

## What's next ? 🤩

- More custom test beds
  - `PipeTestBed`
  - `DirectiveTestBed`
  - `InterceptorTestBed`
  - `RouterTestBed`
- Mocks
- Angular schematics
- Website docs

## Version compatibility

Compatible with Angular `>= 15.2.x`.

## License

[MIT](LICENSE) © Rémy Abitbol.
