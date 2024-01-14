# Event triggering

## Table of contents

- [click](#clickfixture-selectorordirective)
- [emitOutput](#emitoutputfixture-selectorordirective-name-event)

## click(fixture, selectorOrDirective)

Click on the element found by selector or directive.

Throws an Error if not found.

#### Parameters

- fixture
  - type: `ComponentFixture<any>`.
  - description: the root component fixture created with `TestBed`.
- selectorOrDirective
  - type: `string` or `Type<any>`.
  - description: the CSS selector or Angular directive.

#### Example

```ts
import { click } from 'ngx-testing-tools';

// (…)

it('should update state on button click', () => {
  expect(component.clicked).toBeFalse();
  click(fixture, '#my-button'); // by selector
  expect(component.clicked).toBeTrue();
});

it('should have InnerComponent', () => {
  expect(component.clicked).toBeFalse();
  click(fixture, MyButtonDirective); // by directive
  expect(component.clicked).toBeTrue();
});
```

## emitOutput(fixture, selectorOrDirective, name, $event)

Emit output of element found by selector or directive.

Throws an Error if not found.

#### Parameters

- fixture
  - type: `ComponentFixture<any>`.
  - description: the root component fixture created with `TestBed`.
- selectorOrDirective
  - type: `string` or `Type<any>`.
  - description: the CSS selector or Angular directive.
- name
  - type: `string`.
  - description: the output's name.
- $event
  - type: `any`.
  - description: the value that is emitted into the output.

#### Example

```ts
import { emitOutput } from 'ngx-testing-tools';

// (…)

@Component({ template: `<app-inner (clicked)="clicked = $event;"/>` })
class AppComponent {
  clicked = false;
}

// (…)

it('should update state on button click', () => {
  expect(component.clicked).toBeFalse();
  emitOutput(fixture, 'app-inner', 'clicked', true); // by selector
  expect(component.clicked).toBeTrue();
});

it('should have InnerComponent', () => {
  expect(component.clicked).toBeFalse();
  emitOutput(fixture, InnerComponent, 'clicked', true); // by directive
  expect(component.clicked).toBeTrue();
}); 
```
