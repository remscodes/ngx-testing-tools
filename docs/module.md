# Module

## expectModuleToCreate(module, providers?)

Test module creation.

#### Parameters
- module
  - type: `Type<T>`.
  - description: the module to be tested.
- providers?
  - type: `(Provider | EnvironmentProviders)[]`.
  - description: the optional providers.

#### Example

```ts
import { expectModuleToCreate } from 'ngx-testing-extra';

describe('AppModule', () => {
  expectModuleToCreate(AppModule);
});
```
