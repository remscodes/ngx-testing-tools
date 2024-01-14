# Resolver

## checkResolver(resolver, state, routeConfig?)

Check resolver output.

Returns the resolver output value.

> Use the generic type to indicate the return type of the resolver (`checkResolver<T>(…)`). Default is `Observable<boolean>`.

#### Parameters

- resolver
  - type: `ResolveFn`.
  - description: the resolver to be tested.
- state
  - type: `RouterStateSnapshot`.
  - description: the router state.
- routeConfig?
  - type: `RouteSnapshotConfig`.
  - description: the route config.

#### Example

```ts
import { checkResolver } from 'ngx-testing-extra';

it('should resolve', (done) => {
  checkResolver(dataResolver)
    .subscribe({
      next: (value) => {
        // (…)
        done();
      },
    });
}); 
```
