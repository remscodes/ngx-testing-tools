# 2.2.0 (2024-01-31)

### Features

- `ServiceTestBed`.
- `ModuleTestBed`.
- `HttpTestingTools`.
- Many custom test beds options.

### Improvements

- Codebase.
- Tests.
- Docs.

### Deprecations

Will be removed in v3.

- `tb.compileEach()` (use test bed option `autoCompile` instead (true by default)).
- `tb.shouldCreate()` (use test bed option `checkCreate` instead (true by default)).
- `findComponent(fixture, ..)` (use `ComponentTools.query` instead).
- `findAllComponents(fixture, ..)` (use `ComponentTools.query` instead).
- `findElement(fixture, ..)` (use `ComponentTools.query` instead).
- `findAllElements(fixture, ..)` (use `ComponentTools.query` instead).
- `findDebugElement(fixture, ..)` (use `ComponentTools.query` instead).
- `findAllDebugElements(fixture, ..)` (use `ComponentTools.query` instead).
- `click(fixture, ..)` (use `ComponentTools.action` instead).
- `emitOutput(fixture, ..)` (use `ComponentTools.action` instead).
- `emitFakeSuccessResponse(httpController, ..)` (use `HttpTools` instead).
- `emitFakeErrorResponse(httpController, ..)` (use `HttpTools` instead).
- `expectHttpRequest(httpController, ..)` (use `HttpTools` instead).
- `fromInjector(..)` (use `BaseTools.injector` instead).
- `exportModuleToCreate(..)` (use `ModuleTestBed` instead).

> Commits : https://github.com/remscodes/ngx-testing-tools/commits/v2.2.0

# 2.1.0 (2024-01-19)

### Features

- `tb.compileEach()`.
- `tb.setup(..)`.
- `tb.inject(..)`.
- Update Angular 17 compatibility (`17.x`  instead of `17.0.x`).

### Improvements

- Docs.
- Tests.

### Deprecation

Will be removed in v3.

- `ComponentTools.debug`.

> Commits : https://github.com/remscodes/ngx-testing-tools/commits/v2.1.0

# 2.0.1 (2024-01-14)

### Fixes

- Remove `DestroyRef` from `ComponentTools`.

> Commits : https://github.com/remscodes/ngx-testing-tools/commits/v2.0.1

# 2.0.0 (2024-01-14)

### Features

- `ComponentTestBed`.

### Improvements

- Documentation.
- Add unit and integrations tests.
- Add code coverage.
- Add demo.
- Rename package to `ngx-testing-tools`.

> Commits : https://github.com/remscodes/ngx-testing-tools/commits/v2.0.0

# 1.0.0 (2024-01-02)

### Features

- Component testing : instance, native element, debug element and event.
- Pipe testing.
- HTTP testing : response and interceptor.
- Router testing : guard and resolver.
- Injector testing.
- Module testing.

> Commits : https://github.com/remscodes/ngx-testing-extra/commits/v1.0.0
