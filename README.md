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

This library aims to **reduce boilerplate** 😎 and **provides high-level**️ 🔥 ways for testing Component, Service, Router and everything else related to the Angular mechanism.

It makes tests **easier to read** 😌 and **faster to write** ⚡️!

## Quick examples

#### Testing Component

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent) // 🛠️ Creates the test bed which is re-compiled for each test
    .inject('prefs', Preferences); // 💉 Make an injection available for all tests, see below 👇

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
  const tb = serviceTestBed(AppService, { httpTesting: true }); // 🛠️ Creates the test bed and enable http testing

  it('should fetch cat fact', tb(({ service, http, rx }, done) => {
    const mockRes = { fact: 'string', length: 6 };

    rx.remind = service.getCatFact().subscribe({ // 🧯 Use rx.remind to auto unsubscribe after the end of the test
      next: (res) => {
        expect(res).toEqual(mockRes);
        done();
      },
    });

    http.emitSuccessResponse({ url: service.CAT_FACT_URL, body: mockRes }); // 🎭 Fakes the http response of the request that matches the url
  }));
});
```

## Installation

```shell
npm install -D ngx-testing-tools
```

## Documentation

- Custom test beds 🤩
  - **[ComponentTestBed](docs/component/test-bed.md#componenttestbed)**
  - **[ServiceTestBed](docs/service/test-bed.md#servicetestbed)**
  - ModuleTestBed

- Enhanced tools 🔋
  - Base
  - HttpTools
  - RxBox

- Utilities
  - Pipe
    - [Expect values](docs/pipe.md#pipe)
  - Router
    - [Guard](docs/router/guard.md#guard)
    - [Resolver](docs/router/resolver.md#resolver)
  - Http
    - [Interceptor](docs/http/interceptor.md#interceptors)
- Component
  - [Element query](docs/components/element.md#element-query)
  - [Event triggering](docs/components/event.md#event-triggering)

## What's next ? 🤩

- More custom test beds
  - `PipeTestBed`
  - `DirectiveTestBed`
  - `InterceptorTestBed`
  - `RouterTestBed`
- Mocks
- Angular schematics

## Version compatibility

Compatible with Angular `>= 15.2.x`.

## License

[MIT](LICENSE) © Rémy Abitbol.
