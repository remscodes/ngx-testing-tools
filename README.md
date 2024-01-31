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
  - [Common definitions](#common-definitions)

- Common tools 🔋
  - [BaseTools](#basetools-3)
  - [HttpTestingTools](#httptestingtools-2)

- External utilities 🔧
  - Router
    - [Guard](#guard)
    - [Resolver](#resolver)
  - Http
    - [Interceptor](#interceptor)
  - Pipe
    - [Test values](#testpipevaluespipe-record)

- [Demo](#demo)
- [Version compatibility](#version-compatibility)
- [What's next ?](#whats-next--)

## Custom test beds

All custom test beds significantly reduce the boilerplate required to perform tests and provide enhanced tools.

### ComponentTestBed

- [Options](#componenttestbed-options)
- Definitions
  - [tb.import(..)](#importoneormanyimports---componenttestbed)
  - [tb.provide(..)](#provideoneormanyproviders---componenttestbed)
  - [tb.declare(..)](#declareoneormanydeclarations---componenttestbed)
  - [tb.inject(..)](#injectname-token---componenttestbed)
  - [tb.setup(..)](#setupaction---jasmineimplementationcallback)
  - [tb.compile()](#compile---promisevoid)
  - [tb(..)](#assertion-options---jasmineimplementationcallback)
- Tools
  - [ComponentTools](#componenttools)
  - [ComponentQueryTools](#componentquerytools)
  - [ComponentActionTools](#componentactiontools)
  - [BaseTools](#basetools)
  - [HttpTestingTools](#httptestingtools)

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

#### Definitions

#### import(oneOrManyImports) -> ComponentTestBed

Check common definitions [tb.import(..)](#importoneormanyimports---basetestbed).

#### provide(oneOrManyProviders) -> ComponentTestBed

Check common definitions [tb.provide(..)](#provideoneormanyproviders---basetestbed).

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

Check common definitions [tb.inject(..)](#injectname-token---basetestbed).

#### setup(action) -> jasmine.ImplementationCallback

Check common definitions [tb.setup(..)](#setupaction---jasmineimplementationcallback-3).

#### compile() -> Promise\<void\>

Check common definitions [tb.compile(..)](#compile---promisevoid-3).

#### (assertion, options?) -> jasmine.ImplementationCallback

Wraps the `it` assertion function and provides enhanced tools for testing component expectations.

It supports the jasmine `DoneFn` and `async`/`await` (check examples below).

It automatically starts the assertion by running `fixture.detectChanges()` (can be disabled, check options below).

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

#### Tools

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

#### BaseTools

Check common tools [BaseTools](#basetools-3).

#### HttpTestingTools

Check common tools [HttpTestingTools](#httptestingtools-2).

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
  action.emitOutput('#my-input', 'change', 'my text');
  // (…) expectations
})); 
```

### ServiceTestBed

- [Options](#servicetestbed-options)
- Definitions
  - [tb.import(..)](#importoneormanyimports---servicetestbed)
  - [tb.provide(..)](#provideoneormanyproviders---servicetestbed)
  - [tb.inject(..)](#injectname-token---servicetestbed)
  - [tb.setup(..)](#setupaction---jasmineimplementationcallback-1)
  - [tb.compile()](#compile---promisevoid-1)
  - [tb(..)](#assertion-options---jasmineimplementationcallback-1)
- Tools
  - [ServiceTools](#servicetools)
  - [BaseTools](#basetools-1)
  - [HttpTestingTools](#httptestingtools-1)

#### ServiceTestBed Options

```ts
describe('AppService', () => {
  const tb = serviceTestBed(ServiceComponent, {
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

#### Definitions

#### import(oneOrManyImports) -> ServiceTestBed

Check common definitions [tb.import(..)](#importoneormanyimports---basetestbed).

#### provide(oneOrManyProviders) -> ServiceTestBed

Check common definitions [tb.provide(..)](#provideoneormanyproviders---basetestbed).

#### inject(name, token) -> ServiceTestBed

Check common definitions [tb.inject(..)](#injectname-token---basetestbed).

#### setup(action) -> jasmine.ImplementationCallback

Check common definitions [tb.setup(..)](#setupaction---jasmineimplementationcallback-3).

#### compile() -> Promise\<void\>

Check common definitions [tb.compile(..)](#compile---promisevoid-3).

#### (assertion, options?) -> jasmine.ImplementationCallback

Wraps the `it` assertion function and provides enhanced tools for testing component expectations.

It supports the jasmine `DoneFn` and `async`/`await` (check examples below).

Options :

[//]: # (@formatter:off)
```ts
{
  // When enabled, the assertion will end by `HttpTestingController.verify()`.
  // Works only when `httpTesting` test bed option is `true`, otherwise has no effect.
  verifyHttp?: boolean = true;
}
```
[//]: # (@formatter:on)

Examples :

```ts
it('should do something', tb(({ service, injector }) => {
  // (…) expectations
})); 
```

```ts
it('should do something', tb(({ service }, done) => {
  // (…) expectations
  done();
})); 
```

```ts
it('should do something', tb(async ({ service }) => {
  // (…) async expectations 
})); 
```

#### Tools

#### ServiceTools

```ts
{
  // The described service instance.
  service: T;
}
```

#### BaseTools

Check common tools [BaseTools](#basetools-3).

#### HttpTestingTools

Check common tools [HttpTestingTools](#httptestingtools-2).

### ModuleTestBed

- [Options](#moduletestbed-options)
- Definitions
  - [tb.import(..)](#importoneormanyimports---moduletestbed)
  - [tb.provide(..)](#provideoneormanyproviders---moduletestbed)
  - [tb.inject(..)](#injectname-token---moduletestbed)
  - [tb.setup(..)](#setupaction---jasmineimplementationcallback-2)
  - [tb.compile()](#compile---promisevoid-2)
  - [tb(..)](#assertion---jasmineimplementationcallback)
- Tools
  - [ModuleTools](#moduletools)
  - [BaseTools](#basetools-2)

#### ModuleTestBed Options

```ts
describe('AppModule', () => {
  const tb = moduleTestBed(AppModule, {
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
  // Automatically compiles the custom test bed for each test.
  autoCompile?: boolean = true;
  // Automatically invokes the "should create" test.
  // It checks if the provided `described` instance is truthy. 
  checkCreate?: boolean = true;
}
```
[//]: # (@formatter:on)

#### Definitions

#### import(oneOrManyImports) -> ModuleTestBed

Check common definitions [tb.import(..)](#importoneormanyimports---basetestbed).

#### provide(oneOrManyProviders) -> ModuleTestBed

Check common definitions [tb.provide(..)](#provideoneormanyproviders---basetestbed).

#### inject(name, token) -> ModuleTestBed

Check common definitions [tb.inject(..)](#injectname-token---basetestbed).

#### setup(action) -> jasmine.ImplementationCallback

Check common definitions [tb.setup(..)](#setupaction---jasmineimplementationcallback-3).

#### compile() -> Promise\<void\>

Check common definitions [tb.compile(..)](#compile---promisevoid-3).

#### (assertion) -> jasmine.ImplementationCallback

Wraps the `it` assertion function and provides enhanced tools for testing component expectations.

It supports the jasmine `DoneFn` and `async`/`await` (check examples below).

Examples :

```ts
it('should do something', tb(({ module }) => {
  // (…) expectations
})); 
```

```ts
it('should do something', tb(({ module }, done) => {
  // (…) expectations
  done();
})); 
```

```ts
it('should do something', tb(async ({ module }) => {
  // (…) async expectations 
})); 
```

#### Tools

#### ModuleTools

```ts
{
  // The described module instance.
  module: T;
}
```

#### BaseTools

Check common tools [BaseTools](#basetools-3).

### Common definitions

- Definitions
  - [tb.import(..)](#importoneormanyimports---basetestbed)
  - [tb.provide(..)](#provideoneormanyproviders---basetestbed)
  - [tb.inject(..)](#injectname-token---basetestbed)
  - [tb.setup(..)](#setupaction---jasmineimplementationcallback-3)
  - [tb.compile()](#compile---promisevoid-3)

#### Definitions

#### import(oneOrManyImports) -> BaseTestBed

Imports required module(s) and standalone component(s) into testing module for your current tests.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .import(SharedModule)
    .import([StandaloneComponent, MaterialModule]);
});
```

#### provide(oneOrManyProviders) -> BaseTestBed

Provides required injectable service(s) or other(s) provider(s) into testing module for your current tests.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .provide(AppService)
    .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
});
```

#### inject(name, token) -> BaseTestBed

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

#### setup(action) -> jasmine.ImplementationCallback

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

#### compile() -> Promise\<void\>

To be used when you need to do extra setups before compiling the custom test bed.

**It has to be used into `beforeEach()` setup.**

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent, { autoCompile: false });

  beforeEach(() => {
    // (…) my extra setup
    return tb.compile();
  });
});
```

### Common tools

- Tools
  - [BaseTools](#basetools-3)
  - [HttpTestingTools](#httptestingtools-2)

#### BaseTools

[//]: # (@formatter:off)
```ts
{
  // The root injector.
  injector: Injector;
  // Injected instances (check tb.inject(..) method).
  injected: { [k: string]: any; };
  // Box that automatically clears all supplied "Subscription" and "Subject".
  rx: RxBox;
}
```
[//]: # (@formatter:on)

- [injector](#injector)
- [injected](#injected)
- [rx](#rx)

##### injector

```ts
it('should do something', tb(({ injector }) => {
  const service = injector.get(AppService);
  // (…) expectations
}));
```

##### injected

Get instance injected with [tb.inject(..)](#injectname-token---basetestbed) by autocompletion.

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .inject('storage', StorageService)
    .inject('auth', AuthService);
});

it('should do something', tb(({ injected: { storage, auth } }) => {
  // (…) expectations
}));
```

##### rx

```ts
it('should do something', tb(({ rx }) => {
  // Auto unsubscribe after the test end
  rx.remind = myObservable.subscrible();

  // Auto complete after the test end
  const subject = new Subject();
  rx.remind = subject;
  // (…) expectations
})); 
```

#### HttpTestingTools

```ts
{
  // Only when the test bed option `httpTesting` is `true`.
  http: HttpTools;
}
```

- [client](#client)
- [controller](#controller)
- [emitSuccessResponse](#emitsuccessresponseconfig)
- [emitErrorResponse](#emiterrorresponseconfig)

##### client

Angular `HttpClient`.

##### controller

Angular `HttpTestingController`.

##### emitSuccessResponse(config)

Fakes a http success response for the request that matches the url.

```ts
it('should do somehting', tb(({ http }, done) => {
  const mockRes = 'result';

  http.get('/test').subscribe({
    next: (value) => {
      expect(value).toEqual(mockRes);
      done();
    },
  });

  http.emitSuccessResponse({ url: '/test', body: mockRes });
})); 
```

##### emitErrorResponse(config)

Fakes a http error response for the request that matches the url.

```ts
it('should do something', tb(({ http }, done) => {
  http.get('/test').subscribe({
    error: ({ status }) => {
      expect(status).toEqual(401);
      done();
    },
  });

  http.emitErrorResponse({ url: '/test', status: 401 });
})); 
```

### External utilities

External utilities to be used inside or outside the custom test beds.

### Router

#### Guard

- [challengeGuardActivate(…)](#challengeguardactivateguard-state-routeconfig---r)
- [challengeGuardDeactivate(…)](#challengeguarddeactivateguard-component-currentstate-nextstate-routeconfig---r)
- [challengeGuardMatch(…)](#challengeguardmatchguard-route-segments---r)

##### challengeGuardActivate(guard, state, routeConfig?) -> R

Tests the `CanActivate` guard and checks its output value.

> Use the generic type to indicate the return type of the guard (`challengeGuardActivate<R>(…)`). Default is `boolean`.

```ts
it('should activate', () => {
  const state = TestBed.inject(Router).routerState.snapshot;
  expect(challengeGuardActivate(loginGuard, state)).toBeTrue();
}); 
```

##### challengeGuardDeactivate(guard, component, currentState, nextState, routeConfig?) -> R

Tests the `CanDeactivate` guard and checks its output value.

> Use the generic type to indicate the return type of the guard (`challengeGuardDeactivate<R>(…)`). Default is `boolean`.

```ts
it('should deactivate', () => {
  const state = TestBed.inject(Router).routerState.snapshot;
  expect(challengeGuardDeactivate(component, backGuard, currentState, nextState)).toBeTrue();
}); 
```

##### challengeGuardMatch(guard, route, segments) -> R

Tests the `CanMatch` guard and checks its output value.

> Use the generic type to indicate the return type of the guard (`challengeGuardMatch<T, R>(…)`). Default is `boolean`.

```ts
it('should match', () => {
  expect(challengeGuardMatch(loadGuard, { data: { isAllowed: true } }, [])).toBeTrue();
}); 
```

#### Resolver

##### checkResolver(resolver, state, routeConfig?) -> R

Checks resolver output.

> Use the generic type to indicate the return type of the resolver (`checkResolver<R>(…)`). Default is `Observable<boolean>`.

```ts
it('should resolve', (done) => {
  const state = TestBed.inject(Router).routerState.snapshot;
  checkResolver(myResolver, state, { params: { id: 1 } }).subscribe({
    next: (result) => {
      // (…) expectations
      done();
    },
  });
}); 
```

### Http

#### Interceptor

Utilities to check the behaviour of interceptors according to the success or failure of the request/response.

- [makeInterceptorSucceed(…)](#makeinterceptorsucceedinterceptor-config)
- [makeInterceptorFail(…)](#makeinterceptorfailinterceptor-config)

##### makeInterceptorSucceed(interceptor, config?)

Makes interceptor succeed to observe the output `HttpRequest`.

```ts
it('should intercept and add header', (done) => {
  makeInterceptorSucceed(myInterceptor).subscribe({
    next: ({ headers }: HttpRequest<unknown>) => {
      expect(headers.get('x-my-header')).toEqual('my-header-value');
      done();
    },
  });
});
```

##### makeInterceptorFail(interceptor, config?)

Makes interceptor fail to observe the output `HttpErrorResponse`.

```ts
it('should intercept and error', (done) => {
  makeInterceptorFail(myInterceptor, { status: 401 }).subscribe({
    error: ({ status }: HttpErrorResponse) => {
      expect(status).toEqual(401);
      done();
    },
  });
});
```

### Pipe

#### testPipeValues(pipe, record)

Tests the pipe by successively transform the record's key and compare it to the expected record's value.

```ts
describe('MultiplyPipe', () => {
  const pipe = new MultiplyPipe();

  testPipeValues(pipe, {
    1: '2',
    2: '4',
  });
});
```

## Demo

Check [demo](./projects/ngx-testing-tools-demo) `.spec.ts` files.

## Version compatibility

Compatible with Angular `>= 15.2.x`.

## What's next ? 🤩

- More custom test beds :
  - `PipeTestBed`
  - `DirectiveTestBed`
  - `InterceptorTestBed`
  - `RouterTestBed`
- Mocks
- Angular schematics
- Website documentation

## License

[MIT](LICENSE) © Rémy Abitbol.
