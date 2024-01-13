# Injector

## fromInjector(fixture, token)

Get instance by token from the current component fixture injector.

#### Parameters

- fixture
  - type: `ComponentFixture<any>`.
  - description: Root component fixture created with `TestBed`.
- token
  - type: `ProviderToken<T>`
  - description: token associated to instance.

#### Example

```ts
import { fromInjector } from 'ngx-testing-extra';

// (…)

it('should do something', () => {
  const appService = fromInjector(fixture, AppService);
  const myConfig = fromInjector(fixture, MY_CONFIG_TOKEN);
  // (…)
}); 
```
