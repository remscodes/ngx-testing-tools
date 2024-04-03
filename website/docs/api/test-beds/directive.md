---
title: Directive
---

# Directive TestBed

**Quick Example**

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

  it('should render title', tb(({ host, query }) => {
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

## DirectiveTools

## Tools options
