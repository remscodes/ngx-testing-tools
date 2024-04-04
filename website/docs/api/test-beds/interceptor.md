---
title: Interceptor
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interceptor TestBed

**Quick example**

```ts

```

## `interceptorTestBed(..)`

Creates a specific test bed for interceptor.

:::info
Works for function (`HttpInterceptorFn`) and class (that implements `HttpInterceptor`) interceptor.
:::

It returns a function to be used to wrap `it`'s callback and from which you access tools (check [InterceptorTools](#tools)).

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    describe('appInterceptor', () => {
      const tb = interceptorTestBed(appInterceptor());

      it('should ', tb((tools) => { // <-- tb function used here
        // ... expectations
      }));
    });
    ```

    `tb` function supports the jasmine `DoneFn` and async/await notation.

    ```ts
    describe('appInterceptor', () => {
      const tb = interceptorTestBed(appInterceptor());
    
      it('should ', tb(async (tools) => {
        // ... async expectations
      }));
    
      it('should ', tb((tools, done) => {
        // ... expectations
        done();
      }));
    });
    ```

  </TabItem>

  <TabItem value="Class">
    ```ts
    describe('AppInterceptor', () => {
      const tb = interceptorTestBed(AppInterceptor);

      it('should ', tb((tools) => { // <-- tb function used here
        // ... expectations
      }));
    });
    ```

    `tb` function supports the jasmine `DoneFn` and async/await notation.
    
    ```ts
    describe('AppInterceptor', () => {
      const tb = interceptorTestBed(AppInterceptor);
    
      it('should ', tb(async (tools) => {
        // ... async expectations
      }));
    
      it('should ', tb((tools, done) => {
        // ... expectations
        done();
      }));
    });
    ```

  </TabItem>
</Tabs>

## TestBed Options

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    describe('appInterceptor', () => {
      const tb = pipeTestBed(appInterceptor(), {} /* <- here */);

      it('should ', tb(() => {
        // ... expectations
      }));
    });
    ```

  </TabItem>

  <TabItem value="Class">
    ```ts
    describe('AppInterceptor', () => {
      const tb = pipeTestBed(AppInterceptor, {} /* <- here */);

      it('should ', tb(() => {
        // ... expectations
      }));
    });
    ```

  </TabItem>
</Tabs>

### `imports`

**Default** : `[]`

Imports dependencies for the described interceptor.

Example :

<Tabs groupId="interceptors-type">

  <TabItem value="function">
  ```ts
  const tb = interceptorTestBed(appInterceptor(), {
    imports: [SharedModule, MaterialModule],
  });
  ```
  </TabItem>

  <TabItem value="Class">
    ```ts
    const tb = interceptorTestBed(AppInterceptor, {
      imports: [SharedModule, MaterialModule],
    });
    ```
  </TabItem>
</Tabs>

### `providers`

**Default** : `[]`

List of providers to be available during tests for the described interceptor.

Example :

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    const tb = interceptorTestBed(appInterceptor(), {
      providers: [AuthService, { provide: StoreService, useClass: MockStoreService }],
    });
    ```
  </TabItem>

  <TabItem value="Class">
    ```ts
    const tb = interceptorTestBed(AppInterceptor, {
      providers: [AuthService, { provide: StoreService, useClass: MockStoreService }],
    });
    ```
  </TabItem>
</Tabs>

### `autoCompile`

**Default** : `true`

Automatically compiles the custom test bed for each test.

### `checkCreate`

**Default** : `true`

Automatically invokes the "should create" Angular test.

It checks if the provided `described` instance is truthy.

## Tools

The tb function provides `InterceptorTools`.

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    describe('appInterceptor', () => {
      const tb = interceptorTestBed(appInterceptor());

      it('should ', tb((tools /* <- here */) => {
        // ... expectations
      }));
    });
    ```

  </TabItem>

  <TabItem value="Class">
    ```ts
    describe('AppInterceptor', () => {
      const tb = interceptorTestBed(AppInterceptor);

      it('should ', tb((tools /* <- here */) => {
        // ... expectations
      }));
    });
    ```

  </TabItem>
</Tabs>

`InterceptorTools` extends **[BaseTools](../common/base-tools)** and **[HttpTestingTools](../common/http-testing-tools)**.

### `interceptor`

The described interceptor instance.

:::info
The instance is typed according to the passed interceptor in `interceptorTestBed(..)`.
:::

Example :

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    it('should ', tb(({ interceptor }) => {
      interceptor(req, next).subscribe(..);  
    }));
    ```
  </TabItem>

  <TabItem value="Class">
    ```ts
    it('should ', tb(({ interceptor }) => {
      expect(interceptor.prop).toEqual('foo');
    }));
    ```
  </TabItem>
</Tabs>

### `inspect`

## `InterceptorTestBed`

### `import(..)`

Same as [options imports](#imports) but with chaining methods.

Example :

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    describe('appInterceptor', () => {
      const tb = interceptorTestBed(appInterceptor())
        .import(SharedModule)
        .import([ThirdPartyModule, MaterialModule]);
    });
    ```
  </TabItem>

  <TabItem value="Class">
    ```ts
    describe('AppInterceptor', () => {
      const tb = interceptorTestBed(AppInterceptor)
        .import(SharedModule)
        .import([ThirdPartyModule, MaterialModule]);
    });
    ```
  </TabItem>
</Tabs>

### `provide(..)`

Same as [options providers](#providers) but with chaining methods.

Example :

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    describe('appInterceptor', () => {
      const tb = interceptorTestBed(appInterceptor())
        .provide(NotifService)
        .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
    });
    ```
  </TabItem>

  <TabItem value="Class">
    ```ts
    describe('AppInterceptor', () => {
      const tb = interceptorTestBed(AppInterceptor)
        .provide(NotifService)
        .provide([StoreService, { provide: MY_TOKEN, useValue: mockValue }]);
    });
    ```
  </TabItem>
</Tabs>

### `inject(..)`

Links an injected instance to a key and retrieve it into the enhanced tools by autocompletion.

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    describe('appInterceptor', () => {
      const tb = interceptorTestBed(appInterceptor())
        .inject('auth', AuthService);

      it('should ', tb(({ injected: { auth } }) => {
        // ... expectations
      }));
    });
    ```

  </TabItem>

  <TabItem value="Class">
    ```ts
    describe('AppInterceptor', () => {
      const tb = interceptorTestBed(AppInterceptor)
        .inject('auth', AuthService);

      it('should ', tb(({ injected: { auth } }) => {
        // ... expectations
      }));
    });
    ```

  </TabItem>
</Tabs>

### `setup(..)`

Setups extra action using the enhanced tools.

Works only for `beforeEach` and `afterEach`.

Example :

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    describe('appInterceptor', () => {
      const tb = interceptorTestBed(appInterceptor())
        inject('store', StoreService);

      beforeEach(tb.setup(({ injected: { store } }) => {
        store.foo = true;
      }));
    });
    ```

  </TabItem>

  <TabItem value="Class">
    ```ts
    describe('AppInterceptor', () => {
      const tb = interceptorTestBed(AppInterceptor);

      beforeEach(tb.setup(({ interceptor }) => {
        interceptor.foo = true;
      }));
    });
    ```

  </TabItem>
</Tabs>

### `compile(..)`

To be used when you need to do third party setups before compiling the custom test bed.

**It has to be used into `beforeEach(..)` and [autoCompile](#autocompile) must be set to `false`.**

<Tabs groupId="interceptors-type">

  <TabItem value="function">
    ```ts
    describe('appInterceptor', () => {
      const tb = interceptorTestBed(appInterceptor(), { autoCompile: false });

      beforeEach(async () => {
        // ... third party setup
        await tb.compile();
      });
    });
    ```

  </TabItem>

  <TabItem value="Class">
    ```ts
    describe('AppInterceptor', () => {
      const tb = interceptorTestBed(AppInterceptor, { autoCompile: false });

      beforeEach(async () => {
        // ... third party setup
        await tb.compile();
      });
    });
    ```

  </TabItem>
</Tabs>
