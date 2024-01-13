# Component TestBed

The component TestBed significantly reduces the boilerplate required to perform component tests.

In addition, it provides the same utilities described in [element.md](element.md#querying-elements-functions) and [event.md](event.md#events-functions) but without the fixture parameter.

## Preview example

```ts
import { componentTestBed } from 'ngx-testing-extra';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { InnerComponent } from './inner.component';

describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);
  beforeEach(() => tb.compile());

  tb.shouldCreate();

  it('should update `clicked` on button click', tb(({ component, action }) => {
    expect(component.clicked).toBeFalse();
    action.click('#my-button');
    expect(component.clicked).toBeTrue();
  }));

  it('should store in AppService when InnerComponent input is true', tb(({ query, fixture, injector }) => {
    const inner = query.findComponent(InnerComponent);
    inner.myInput = true;

    fixture.detectChanges();

    const appService = injector.get(AppService);
    expect(appService.something).toBeEqual({ status: 'OK' });
  }));
});
```

## Table of contents

- [componentTestBed(…)](#componenttestbedrootcomponent)
- [ComponentTestBed](#componenttestbed)
  - [import(…)](#importoneormanyimports)
  - [declare(…)](#declareoneormanycomponents)
  - [provide(…)](#provideoneormanyproviders)
  - [compile()](#compile)
  - [(…) (direct call)](#assertion-options)

## componentTestBed(rootComponent)

Return the `ComponentTestBed` associated to the described component.

It will check that the provided `rootComponent` is definitely a component.

> The root component will be automatically being "imported" (standalone) or "declared" (not standalone) into testing module.

#### Parameters

- rootComponent
  - type: `Type<any>`.
  - description: Component to be described and from which the fixture will be created.

#### Examples

```ts
const tb = componentTestBed(AppComponent); // OK
```

```ts
const tb = componentTestBed(MyButtonDirective); // Not OK, throws an Error
```

## ComponentTestBed

Embed all methods required to configure the testing module and to wrap every expectation functions.

### compile()

Compile the `ComponentTestBed` to be able to provide tools into tb()'s callback (see [below](#assertion-options)).

It has to be used into `beforeEach()` setup.

Return a `Promise<void>`.

#### Usage

```ts
beforeEach(() => tb.compile());
```

### import(oneOrManyImports)

Import required module(s) and standalone component(s) into testing module for your current tests.

Returns the current `ComponentTestBed` instance.

#### Parameters

- oneOrManyImports
  - type: `Type<any>` or `ModuleWithProviders<any>` or `(Type<any> | ModuleWithProviders<any>)[]`
  - description: Module(s) or standalone Component(s)

#### Examples

```ts
beforeEach(() => tb.import(AppService).compile());
```

```ts
beforeEach(() => tb.import([AppService, MaterialModule]).compile());
```

### declare(oneOrManyComponents)

Declare required no standalone component(s) into testing module for your current tests.

Returns the current `ComponentTestBed` instance.

#### Parameters

- oneOrManyComponents
  - type: `Type<any>` or `Type<any>[]`.
  - description: no standalone Component(s).

#### Examples

```ts
beforeEach(() => tb.declare(AppFirstComponent).compile());
```

```ts
beforeEach(() => tb.declare([AppFirstComponent, AppSecondComponent]).compile());
```

### provide(oneOrManyProviders)

Provide injectable service(s) or other(s) provider(s) required into testing module for your current tests.

Returns the current `ComponentTestBed` instance.

#### Examples

```ts
beforeEach(() => tb.provide(AppService).compile());
```

```ts
beforeEach(() => tb.provide([AppService, { provide: MY_TOKEN, useValue: mockValue }]).compile());
```

### (assertion, options?)

Wraps the function of the `it` assertion and provides enhanced tools for testing component expectations.

It automatically starts the assertion by running `fixture.detectChanges()`.

#### Parameters

- assertion
  - type: `(tools: ComponentTools<T>, done: DoneFn) => (void | PromiseLike<any>)`.
  - description: the assertion function.

```ts
interface ComponentTools<T> {
  fixture: ComponentFixture<T>;
  component: T;
  injector: Injector;
  destroyRef: DestroyRef;
  debug: DebugElement;
  query: ComponentQueryTools;
  action: ComponentActionTools;
}
```

- options?
  - type: `ComponentExtraOptions`.
  - description: tb options.

```ts
interface ComponentExtraOptions {
  /**
   * Runs component fixture `detectChanges()` once before executing the assertion function.
   * @default true
   */
  startDetectChanges?: boolean;
}
```

#### Examples

```ts
it('should do something', tb(({ component, fixture, injector, action, query }) => {
  const inner = query.findComponent(InnerComponent);
  action.click('#my-button');

  const appService = injector.get(AppService);

  // (…)
})); 
```

```ts
it('should do something', tb(({ component, fixture }, done) => {
  // (…)
  done();
}, { startDetectChanges: false })); 
```

```ts
it('should do something', tb(async ({ component, fixture }) => {
  // async code (…)
})); 
```