---
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Introduction

## In a nutshell

This library aims to **reduce boilerplate** 😎 and **provides high-level tools**️ 🔥 for testing Component, Service, Interceptor and everything else related to the Angular mechanism.

It makes tests **easier to read** 😌 and **faster to write** ⚡️!

## Quick examples

#### Testing Component

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent) // 🛠️ Create the test bed which is re-compiled for each test
    .inject('prefs', Preferences); // 🖇️ Link a key to an injection for all tests, see below 👇

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
  const tb = serviceTestBed(AppService, { httpTesting: true }); // 🛠️ Create the test bed and enable http testing

  it('should fetch cat fact', tb(({ service, http, rx }, done) => {
    const mockBody = { fact: 'string', length: 6 };

    rx.remind = service.getCatFact().subscribe({ // 🧯 Use rx.remind to auto unsubscribe after the end of the test
      next: (res) => {
        expect(res).toEqual(mockBody);
        done();
      },
    });

    http.emitSuccessResponse({ url: service.CAT_FACT_URL, body: mockBody }); // 🎭 Fake the http response of the request that matches the url
  }));
});
```
