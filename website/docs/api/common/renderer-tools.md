# RendererTools

The test beds tools that extends these tools are :

- [ComponentTools](../test-beds/component#tools)
- [DirectiveTools](../test-beds/directive#tools)

```ts
it('should ', tb(({ query, action }) => {
  // ... expectations
}));
```

## `query`

Enhanced tools to query elements inside the host component.

```ts
it('should ', tb(({ query }) => {
  const service = injector.get(AppService);
  // ... expectations
}));
```

### `findComponent(..)`

Returns the first component instance found with the provided CSS selector or directive.

:::note
Throws an Error if not found.
:::

:::warning
Querying native element (ex: button, span, etc...) that is not an Angular component will return the host component instance instead.
:::

```ts
it('should ', tb(({ query }) => {
  const inner = query.findComponent(InnerComponent);
  const scanner = query.findComponent('app-scanner');
  // ... expectations
}));
```

### `findAllComponents(..)`

Returns an array of all component instances found with the provided CSS selector or directive.

:::note
Throws an Error if not found.
:::

:::warning
Querying native element (ex: button, span, etc...) that is not an Angular component will return the hosted component instance instead.
:::

```ts
it('should ', tb(({ query }) => {
  const inners = query.findAllComponents(InnerComponent);
  const cards = query.findAllComponents('app-card');
  // ... expectations
})); 
```

### `findElement(..)`

Return the first native element (that extends `HTMLElement`) with by the provided CSS selector or directive.

:::note
Throws an Error if not found.
:::

```ts
it('should ', tb(({ query }) => {
  const inner = query.findElement(InnerComponent);
  const button = query.findElement<HTMLButtonElement>('#my-button');
  // ... expectations
}));
```

### `findAllElements(..)`

Returns an array of all native elements that extends `HTMLElement` found by the provided CSS selector or directive.

:::note
Throws an Error if not found.
:::

```ts
it('should ', tb(({ query }) => {
  const inners = query.findAllElements(InnerComponent);
  const buttons = query.findAllElements<HTMLButtonElement>('button');
  // ... expectations
}));
```

### `findDebugElement(..)`

Returns the first debug element found with the provided CSS selector or directive.

:::note
Throws an Error if not found.
:::

```ts
it('should ', tb(({ query }) => {
  const innerDebug = query.findDebugElement(InnerComponent);
  const buttonDebug = query.findDebugElement('#my-button');
  // ... expectations
}));
```

### `findAllDebugElements(..)`

Returns an array of all debug elements found with the provided CSS selector or directive.

:::note
Throws an Error if not found.
:::

```ts
it('should ', tb(({ query }) => {
  const innerDebugs = query.findAllDebugElements(InnerComponent);
  const buttonDebugs = query.findAllDebugElements('button');
  // ... expectations
}));
```

## `action`

Enhanced tools to perform action on elements inside the host component.

```ts
it('should ', tb(({ action }) => {
  // ... expectations
}));
```

### `click(..)`

Clicks on the element found by CSS selector or directive.

:::note
Throws an Error if not found.
:::

```ts
it('should do something on click', tb(({ action }) => {
  // <button id="my-button" (click)="handleClick()">
  action.click('#my-button');

  // <button buttonDirective (click)="handleClick()">
  action.click(MyButtonDirective);
  
  // ... expectations
})); 
```

### `emitOutput(..)`

Emits output of element found by CSS selector or directive, `eventName` and an optional `$event`.

:::note
Throws an Error if not found.
:::

```ts
it('should do something when output emitted', tb(({ action }) => {
  // <app-scanner (result)="barcode = $event.barcode" />
  action.emitOutput(AppScannerComponent, 'result', { barcode: '123456789' } /* 👈 $event */);

  // <div viewport (onViewport)="enable = $event">(…)</div>
  action.emitOutput(ViewportDirective, 'onViewport', true);

  // <input id="my-input" (change)="handleValue($event)" />
  action.emitOutput('#my-input', 'change', 'my text');

  // ... expectations
})); 
```
