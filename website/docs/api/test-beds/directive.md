---
title: Directive
---

# Directive TestBed

Custom test bed for testing Directive.

:::info
Works for standalone and non-standalone directive.
:::

**Quick example**

```ts
@Component({
  template: `<span id="my-text" [highlight]="color">My Text</span>`,
  standalone: true,
  imports: [AppDirective],
})
class HostComponent {
  public color: string | undefined;
}

describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent);

  it('should ', tb(({ host, fixture, directive, query }) => {
    const span = query.findElement<HTMLSpanElement>('#my-text');

    expect(span.style.backgroundColor).toEqual(directive.DEFAULT_COLOR);

    host.color = 'red';
    fixture.detectChanges();

    expect(span.style.backgroundColor).toEqual('red');
  }));
});
```

## `directiveTestBed(..)`

Creates a specific test bed for directive.

```ts
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent);

  it('should ', tb((tools) => { // 👈 tb function used here
    // ... expectations
  }));
});
```

`tb` function supports the jasmine `DoneFn` and async/await notation.

```ts
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent);

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
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent, {} /* 👈 here */);

  it('should ', tb(() => {
    // ... expectations
  }));
});
```

### `imports`

**Default** : `[]`

Imports template's dependencies for the described host component and its children.

:::note
It is often used for non-standalone component, because standalone component embed its own importations.
:::

Example :

```ts
const tb = directiveTestBed(AppDirective, HostComponent, {
  imports: [SharedModule, MaterialModule],
});
```

### `providers`

**Default** : `[]`

List of providers to be available during tests for the described host component and its children.

Example :

```ts
const tb = directiveTestBed(AppDirective, HostComponent, {
  providers: [AppService, { provide: StoreService, useClass: MockStoreService }],
});
```

### `declarations`

**Default** : `[]`

List of components, directives and pipes to be used in the described **non-standalone** host component template.

Example :

```ts
const tb = directiveTestBed(AppDirective, HostComponent, {
  declarations: [ChildComponent, ColorDirective, AppPipe],
});
```

### `schemas`

**Default** : `[]`

Allows specific elements and properties to be used in the template.

See Angular [CUSTOM_ELEMENTS_SCHEMA](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA)
and [NO_ERRORS_SCHEMA](https://angular.io/api/core/NO_ERRORS_SCHEMA).

Example :

```ts
const tb = directiveTestBed(AppDirective, HostComponent, {
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

Runs host component `fixture.detectChanges()` before each assertion.

:::warning
Has no effect if [noTemplate](#notemplate) is `true`.
:::

### `noTemplate`

**Default** : `false`

Useful when you only want to test the logic of the described host component.

If enabled, no template will be rendered and no change detections will be performed.

### `autoCompile`

**Default** : `true`

Automatically compiles the custom test bed for each test.

### `checkCreate`

**Default** : `true`

Automatically invokes the "should create" Angular test.

It checks if the provided described instance is truthy.

## Assertion tools

The tb function provides `DirectiveTools`.

```ts
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent);

  it('should ', tb((tools /* 👈 here */) => {
    // ... expectations
  }));
});
```

👉 `DirectiveTools` extends **[BaseTools](../common/base-tools)** and **[RendererTools](../common/renderer-tools)**.

### `directive`

The described directive instance.

:::info
The instance is typed according to the passed component `Type<T>` in `directiveTestBed(..)`.
:::

Example :

```ts
it('should ', tb(({ directive }) => {
  expect(directive.prop).toEqual('foo');
}));
```

### `host`

The host component.

```ts
it('should ', tb(({ host }) => {
  // ... expectations
}));
```

## Assertion options

For specific test, you enable/disable options that override the test bed options.

```ts
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent);

  it('should ', tb((tools) => {
    // ... expectations
  }, {} /* 👈 here */));
});
```

### `startDetectChanges`

Same as [options startDetectChanges](#startdetectchanges) but **only for the current assertion**.

## `ComponentTestBed`

### `import(..)`

Same as [options imports](#imports) but with chaining methods.

Example :

```ts
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent)
    .import(SharedModule)
    .import([ThirdPartyModule, MaterialModule]);
});
```

### `provide(..)`

Same as [options providers](#providers) but with chaining methods.

Example :

```ts
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent)
    .provide(AppService)
    .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
});
```

### `declare(..)`

Same as [options declarations](#declarations) but with chaining methods.

Example :

```ts
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent)
    .declare(ChildComponent)
    .declare([HeaderComponent, AppPipe]);
});
```

### `inject(..)`

Links an injected instance to a key and retrieve it into the enhanced tools by autocompletion.

```ts
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent)
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
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent);

  beforeEach(tb.setup(({ directive }) => {
    directive.foo = true;
  }));
});
```

### `compile()`

To be used when you need to do third party setups before compiling the custom test bed.

:::warning
It has to be used into `beforeEach(..)` and [autoCompile](#autocompile) must be set to `false`.
:::

```ts
describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent, { autoCompile: false });

  beforeEach(async () => {
    // ... third party setup
    await tb.compile();
  });
});
```

## `itShouldCreateDirective(..)`

Create the "should create" for the described directive.

To be used when there are no apparent or relevant tests to be performed.

```ts
describe('AppDirective', () => {
  itShouldCreateComponent(AppDirective);
});
```
