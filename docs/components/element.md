# Querying elements functions

#### Parameters

All the functions described below have the same required parameters :

- fixture
  - type: `ComponentFixture<any>`.
  - description: Root component fixture created with `TestBed`.
- selectorOrDirective
  - type: `string` or `Type<any>`.
  - description: CSS selector or Angular directive.

## Table of contents

- [findComponent](#findcomponentfixture-selectorordirective)
- [findAllComponents](#findallcomponentsfixture-selectorordirective)
- [findElement](#findelementfixture-selectorordirective)
- [findAllElements](#findallelementsfixture-selectorordirective)
- [findDebugElement](#finddebugelementfixture-selectorordirective)
- [findAllDebugElements](#findalldebugelementsfixture-selectorordirective)

## findComponent(fixture, selectorOrDirective)

Find one component instance by the provided CSS selector or directives.

> /!\ Querying native element (ex: button, span, etc...) that is not an Angular component will return the hosted component instance instead.

#### Examples

```ts
import { findComponent } from 'ngx-testing-extra';

// [...]

it('should have InnerComponent', () => {
  const inner = findComponent<InnerComponent>(fixture, 'app-inner'); // by selector
  expect(inner).toBeInstanceOf(InnerComponent);
});

it('should have InnerComponent', () => {
  const inner = findComponent(fixture, InnerComponent); // by directive
  expect(inner).toBeInstanceOf(InnerComponent);
}); 
```

## findAllComponents(fixture, selectorOrDirective)

Find all component instances by the provided CSS selector or directives.

> /!\ Querying native element (ex: button, span, etc...) that is not an Angular component will dzreturn the hosted component instance instead.

#### Examples

```ts
import { findAllComponents } from 'ngx-testing-extra';

// [...]

it('should have many InnerComponent', () => {
  const inners = findAllComponents<InnerComponent>(fixture, 'app-inner'); // by selector
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(InnerComponent))
});

it('should have many InnerComponent', () => {
  const inners = findAllComponents(fixture, InnerComponent); // by directive
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(InnerComponent))
}); 
```

## findElement(fixture, selectorOrDirective)

Find one native element that extends `HTMLElement` by the provided CSS selector or directives.

#### Examples

```ts
import { findElement } from 'ngx-testing-extra';

// [...]

it('should have button', () => {
  const button = findElement<HTMLButtonElement>(fixture, '#my-button'); // by selector
  expect(button).toBeInstanceOf(HTMLButtonElement);
});

it('should have button', () => {
  const button = findElement<HTMLButtonElement>(fixture, MyButtonDirective); // by directive
  expect(button).toBeInstanceOf(HTMLButtonElement);
});

it('should have InnerComponent', () => {
  const inner = findElement(fixture, 'app-inner'); // by selector
  expect(inner).toBeInstanceOf(HTMLElement);
});

it('should have InnerComponent', () => {
  const inner = findElement(fixture, InnerComponent); // by directive
  expect(inner).toBeInstanceOf(HTMLElement);
});
```

## findAllElements(fixture, selectorOrDirective)

Find all native elements that extends `HTMLElement` by the provided CSS selector or directives.

#### Examples 

```ts
import { findAllElements } from 'ngx-testing-extra';

// [...]

it('should have buttons', () => {
  const buttons = findAllElements<HTMLButtonElement>(fixture, '#my-button'); // by selector
  expect(buttons).toHaveSize(2);
  buttons.forEach(button => expect(button).toBeInstanceOf(HTMLButtonElement));
});

it('should have buttons', () => {
  const buttons = findAllElements<HTMLButtonElement>(fixture, MyButtonDirective); // by directive
  expect(buttons).toHaveSize(2);
  buttons.forEach(button => expect(button).toBeInstanceOf(HTMLButtonElement));
});

it('should have InnerComponent', () => {
  const inners = findAllElements(fixture, 'app-inner'); // by selector
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(InnerComponent));
});

it('should have InnerComponent', () => {
  const inners = findAllElements(fixture, InnerComponent); // by directive
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(InnerComponent));
});
```

## findDebugElement(fixture, selectorOrDirective)

Find one debug element by the provided CSS selector or directives.

#### Example

```ts
import { findDebugElement } from 'ngx-testing-extra';

// [...]

it('should have button', () => {
  const button = findDebugElement(fixture, '#my-button'); // by selector
  expect(button).toBeInstanceOf(DebugElement);
});

it('should have button', () => {
  const button = findDebugElement(fixture, MyButtonDirective); // by directive
  expect(button).toBeInstanceOf(DebugElement);
});

it('should have InnerComponent', () => {
  const inner = findComponent(fixture, 'app-inner'); // by selector
  expect(inner).toBeInstanceOf(DebugElement);
});

it('should have InnerComponent', () => {
  const inner = findComponent(fixture, InnerComponent); // by directive
  expect(inner).toBeInstanceOf(DebugElement);
});
```

## findAllDebugElements(fixture, selectorOrDirective)

Find all debug elements by the provided CSS selector or directives.

#### Example

```ts
import { findAllDebugElements } from 'ngx-testing-extra';

// [...]

it('should have button', () => {
  const buttons = findAllDebugElements(fixture, '#my-button'); // by selector
  expect(buttons).toHaveSize(2);
  buttons.forEach(button => expect(button).toBeInstanceOf(DebugElement));
});

it('should have button', () => {
  const buttons = findAllDebugElements(fixture, MyButtonDirective); // by directive
  expect(buttons).toHaveSize(2);
  buttons.forEach(button => expect(button).toBeInstanceOf(DebugElement));
});

it('should have InnerComponent', () => {
  const inners = findAllDebugElements(fixture, 'app-inner'); // by selector
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(DebugElement));
});

it('should have InnerComponent', () => {
  const inners = findAllDebugElements(fixture, InnerComponent); // by directive
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(DebugElement));
});
```
