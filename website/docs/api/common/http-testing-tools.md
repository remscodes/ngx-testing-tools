# HttpTestingTools

The test beds tools that extends these tools are :

- [ComponentTools](../test-beds/component#assertion-tools) (only if [httpTesting](../test-beds/component#httptesting) is `true`)
- [ServiceTools](../test-beds/service#assertion-tools) (only if [httpTesting](../test-beds/service#httptesting) is `true`)
- [GuardTools](../test-beds/guard.mdx#assertion-tools) (only if [httpTesting](../test-beds/service#httptesting) is `true`)
- [ResolverTools](../test-beds/resolver.mdx#assertion-tools) (only if [httpTesting](../test-beds/service#httptesting) is `true`)
- [InterceptorTools](../test-beds/interceptor.mdx#assertion-tools) (always)

### `http`

```ts
it('should ', tb(({ http }) => {
  // ... expectations
}));
```

#### `client`

Angular [`HttpClient`](https://angular.dev/api/common/http/HttpClient).

```ts
it('should ', tb(({ http }) => {
  http.client.get(/* ... */)
  // ... expectations
})); 
```

#### `controller`

Angular [`HttpTestingController`](https://angular.dev/api/common/http/testing/HttpTestingController).

```ts
it('should ', tb(({ http }) => {
  http.controller.expect(/* ... */)
  // ... expectations
})); 
```

#### `emitSuccessResponse(..)`

Fakes a http success response for the request that matches the url.

Example :

```ts
it('should ', tb(({ http }, done) => {
  const mockBody = { ok: true };

  http.client.get('/test').subscribe({
    next: (value) => {
      expect(value).toEqual(mockBody);
      done();
    },
  });

  http.emitSuccessResponse({ url: '/test', body: mockBody });
})); 
```

#### `emitErrorResponse(..)`

Fakes a http error response for the request that matches the url.

Example :

```ts
it('should ', tb(({ http }, done) => {
  http.client.get('/test').subscribe({
    error: ({ status }) => {
      expect(status).toEqual(401);
      done();
    },
  });

  http.emitErrorResponse({ url: '/test', status: 401 });
})); 
```
