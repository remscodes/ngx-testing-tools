# Directive

**Quick Example**

```ts
@Component({
  standalone: true,
  imports: [AppDirective],
  template: `
      
    `,
})
class HostComponent {}

describe('AppDirective', () => {
  const tb = directiveTestBed(AppDirective, HostComponent);

  it('should render title', tb(({ component, query }) => { // 🔋 Access enhanced tools for testing components 
    expect(component.title).toEqual('app-v17');
    const span = query.findElement('.content span');
    expect(span.textContent).toContain('app-v17 app is running!');
  }));
});
```

## `directiveTestBed(..)`

Creates a specific test bed for directive.

> Works for standalone and non-standalone directive.

## Options

## Tools

## Tools options
