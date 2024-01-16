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

## Introduction

This library aims to **reduce boilerplate** and **provides high-level** ways for testing component, http response, guard and everything else related to the Angular mechanism.

It makes testing easier to read and more enjoyable.

#### Before

```ts
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(component.title).toEqual('app-v17');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('app-v17 app is running!');
  });
});
```

#### After

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent);
  
  beforeEach(() => tb.compile());

  tb.shouldCreate();

  it('should render title', tb(({ component, query }) => {
    expect(component.title).toEqual('app-v17');
    const textContent = query.findElement('.content span').textContent;
    expect(textContent).toContain('app-v17 app is running!');
  }));
});
```

`ComponentTestBed` gives you access to utilities (`query` and `action`) and more.

These utilities can also be accessed by importing them directly, but they need the current `fixture` as an extra parameter.

## Installation

```shell
npm install -D ngx-testing-tools
```

## Table of contents

- Component
  - **[ComponentTestBed](docs/components/test-bed.md#componenttestbed)** 🤩
  - [Element query](docs/components/element.md#element-query)
  - [Event triggering](docs/components/event.md#event-triggering)
- HTTP
  - [Response](docs/http/controller.md#http-response)
  - [Interceptor](docs/http/interceptor.md#interceptors)
- Router
  - [Guard](docs/router/guard.md#guard)
  - [Resolver](docs/router/resolver.md#resolver)
- Pipe
  - [Expect values](docs/pipe.md#pipe)
- Module
  - [Expect creation](docs/module.md#module)
- Injector
  - [Get instance](docs/injector.md#injector)

## What's next ? 🤩

Similar to `ComponentTestBed` :
- `ServiceTestBed`
- `PipeTestBed`
- `RouterTestBed`

## License

[MIT](LICENSE) © Rémy Abitbol.
