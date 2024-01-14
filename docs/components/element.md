# Element query

#### Parameters

All the functions described below have the same required parameters :

- fixture
  - type: `ComponentFixture<any>`.
  - description: the root component fixture created with `TestBed`.
- selectorOrDirective
  - type: `string` or `Type<any>`.
  - description: the CSS selector or Angular directive.

## Table of contents

- [findComponent(…)](#findcomponentfixture-selectorordirective)
- [findAllComponents(…)](#findallcomponentsfixture-selectorordirective)
- [findElement(…)](#findelementfixture-selectorordirective)
- [findAllElements(…)](#findallelementsfixture-selectorordirective)
- [findDebugElement(…)](#finddebugelementfixture-selectorordirective)
- [findAllDebugElements(…)](#findalldebugelementsfixture-selectorordirective)

## findComponent(fixture, selectorOrDirective)

Returns the first component instance found with the provided CSS selector or directive.

Throws an Error if not found.

> /!\ Querying native element (ex: button, span, etc...) that is not an Angular component will return the hosted component instance instead.

#### Examples

```ts
import { findComponent } from 'ngx-testing-extra';

// (…)

it('should render InnerComponent', () => {
  const inner = findComponent<InnerComponent>(fixture, 'app-inner'); // by selector
  expect(inner).toBeInstanceOf(InnerComponent);
});

it('should render InnerComponent', () => {
  const inner = findComponent(fixture, InnerComponent); // by directive
  expect(inner).toBeInstanceOf(InnerComponent);
}); 
```

## findAllComponents(fixture, selectorOrDirective)

Returns an array of all component instances found with the provided CSS selector or directive.

Throws an Error if not found.

> /!\ Querying native element (ex: button, span, etc...) that is not an Angular component will return the hosted component instance instead.

#### Examples

```ts
import { findAllComponents } from 'ngx-testing-extra';

// (…)

it('should render two InnerComponent', () => {
  const inners = findAllComponents<InnerComponent>(fixture, 'app-inner'); // by selector
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(InnerComponent))
});

it('should render two InnerComponent', () => {
  const inners = findAllComponents(fixture, InnerComponent); // by directive
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(InnerComponent))
}); 
```

## findElement(fixture, selectorOrDirective)

Return the first native element (that extends `HTMLElement`) with by the provided CSS selector or directive.

Throws an Error if not found.

#### Examples

```ts
import { findElement } from 'ngx-testing-extra';

// (…)

it('should render button', () => {
  const button = findElement<HTMLButtonElement>(fixture, '#my-button'); // by selector
  expect(button).toBeInstanceOf(HTMLButtonElement);
});

it('should render button', () => {
  const button = findElement<HTMLButtonElement>(fixture, MyButtonDirective); // by directive
  expect(button).toBeInstanceOf(HTMLButtonElement);
});

it('should render InnerComponent', () => {
  const inner = findElement(fixture, 'app-inner'); // by selector
  expect(inner).toBeInstanceOf(HTMLElement);
});

it('should render InnerComponent', () => {
  const inner = findElement(fixture, InnerComponent); // by directive
  expect(inner).toBeInstanceOf(HTMLElement);
});
```

## findAllElements(fixture, selectorOrDirective)

Returns an array of all native elements that extends `HTMLElement` found by the provided CSS selector or directive.

Throws an Error if not found.

#### Examples 

```ts
import { findAllElements } from 'ngx-testing-extra';

// (…)

it('should render two buttons', () => {
  const buttons = findAllElements<HTMLButtonElement>(fixture, '#my-button'); // by selector
  expect(buttons).toHaveSize(2);
  buttons.forEach(button => expect(button).toBeInstanceOf(HTMLButtonElement));
});

it('should render two buttons', () => {
  const buttons = findAllElements<HTMLButtonElement>(fixture, MyButtonDirective); // by directive
  expect(buttons).toHaveSize(2);
  buttons.forEach(button => expect(button).toBeInstanceOf(HTMLButtonElement));
});

it('should render two InnerComponent', () => {
  const inners = findAllElements(fixture, 'app-inner'); // by selector
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(InnerComponent));
});

it('should render two InnerComponent', () => {
  const inners = findAllElements(fixture, InnerComponent); // by directive
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(InnerComponent));
});
```

## findDebugElement(fixture, selectorOrDirective)

Returns the first debug element found with the provided CSS selector or directive.

Throws an Error if not found.

#### Example

```ts
import { findDebugElement } from 'ngx-testing-extra';

// (…)

it('should render button', () => {
  const button = findDebugElement(fixture, '#my-button'); // by selector
  expect(button).toBeInstanceOf(DebugElement);
});

it('should render button', () => {
  const button = findDebugElement(fixture, MyButtonDirective); // by directive
  expect(button).toBeInstanceOf(DebugElement);
});

it('should render InnerComponent', () => {
  const inner = findComponent(fixture, 'app-inner'); // by selector
  expect(inner).toBeInstanceOf(DebugElement);
});

it('should render InnerComponent', () => {
  const inner = findComponent(fixture, InnerComponent); // by directive
  expect(inner).toBeInstanceOf(DebugElement);
});
```

## findAllDebugElements(fixture, selectorOrDirective)

Returns an array of all debug elements found with the provided CSS selector or directive.

Throws an Error if not found.

#### Example

```ts
import { findAllDebugElements } from 'ngx-testing-extra';

// (…)

it('should render two button', () => {
  const buttons = findAllDebugElements(fixture, '#my-button'); // by selector
  expect(buttons).toHaveSize(2);
  buttons.forEach(button => expect(button).toBeInstanceOf(DebugElement));
});

it('should render two button', () => {
  const buttons = findAllDebugElements(fixture, MyButtonDirective); // by directive
  expect(buttons).toHaveSize(2);
  buttons.forEach(button => expect(button).toBeInstanceOf(DebugElement));
});

it('should render two InnerComponent', () => {
  const inners = findAllDebugElements(fixture, 'app-inner'); // by selector
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(DebugElement));
});

it('should render two InnerComponent', () => {
  const inners = findAllDebugElements(fixture, InnerComponent); // by directive
  expect(inners).toHaveSize(2);
  inners.forEach(inner => expect(inner).toBeInstanceOf(DebugElement));
});
```
