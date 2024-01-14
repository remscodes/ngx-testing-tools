# Guard

## Table of contents

- [challengeGuardActivate(…)](#challengeguardactivateguard-state-routeconfig)
- [challengeGuardDeactivate(…)](#challengeguarddeactivateguard-component-currentstate-nextstate-routeconfig)
- [challengeGuardMatch(…)](#challengeguardmatchguard-route-segments)

## challengeGuardActivate(guard, state, routeConfig?)

Tests the `CanActivate` guard and checks its output value.

Returns the guard output value.

> Use the generic type to indicate the return type of the guard (`challengeGuardActivate<R>(…)`). Default is `boolean`.

#### Parameters

- guard
  - type: `CanActivateFn`.
  - description: the guard to be tested.
- state
  - type: `RouterStateSnapshot`.
  - description: the current router state.
- routeConfig?
  - type: `RouteSnapshotConfig`.
  - description: config to put required route `data`, `params` or `queryParams`.

#### Examples

```ts
import { challengeGuardActivate } from 'ngx-testing-tools';

it('should activate', () => {
  expect(challengeGuardActivate(loginGuard, state)).toBeTrue();
}); 
```

```ts
it('should activate', async () => {
  const output = await challengeGuardActivate<Promise<boolean>>(loginGuard, state);
  expect(output).toBeTrue();
}); 
```

## challengeGuardDeactivate(guard, component, currentState, nextState, routeConfig?)

Tests the `CanDeactivate` guard and checks its output value.

Returns the guard output value.

> Use the generic type to indicate the return type of the guard (`challengeGuardDeactivate<R>(…)`). Default is `boolean`.

#### Parameters

- guard
  - type: `CanDeactivateFn`.
  - description: the guard to be tested.
- component
  - type: `any`
  - description: the component.
- currentState
  - type: `RouterStateSnapshot`.
  - description: the current state.
- nextState
  - type: `RouterStateSnapshot`.
  - description: the next state.
- routeConfig?
  - type: `RouteSnapshotConfig`.
  - description: the route config.

#### Examples

```ts
import { challengeGuardDeactivate } from 'ngx-testing-tools';

it('should deactivate', () => {
  expect(challengeGuardDeactivate(component, backGuard, currentState, nextState)).toBeTrue();
}); 
```

```ts
it('should deactivate', async () => {
  const output = await challengeGuardDeactivate<Promise<boolean>>(component, backGuard, currentState, nextState);
  expect(output).toBeTrue();
}); 
```

## challengeGuardMatch(guard, route, segments)

Tests the `CanMatch` guard and checks its output value.

Returns the guard output value.

> Use the generic type to indicate the return type of the guard (`challengeGuardMatch<T, R>(…)`). Default is `boolean`.

#### Parameters

- guard
  - type: `CanMatchFn`.
  - description: the guard to be tested.
- route
  - type: `Route`.
  - description: the route.
- segments
  - type: `UrlSegment[]`.
  - description: the url segments.

#### Examples

```ts
import { challengeGuardMatch } from 'ngx-testing-tools';

it('should match', () => {
  expect(challengeGuardMatch(loadGuard, route, segments)).toBeTrue();
}); 
```

```ts
it('should match', async () => {
  const output = await challengeGuardMatch<Promise<boolean>>(loadGuard, route, segments);
  expect(output).toBeTrue();
}); 
```
