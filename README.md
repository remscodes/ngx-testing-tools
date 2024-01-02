<div align="center">
    <h1>Angular Testing Extra</h1>
    <p>Utilities for testing an Angular application</p>
</div> 

<div align="center">

[![github ci](https://img.shields.io/github/actions/workflow/status/remscodes/ngx-testing-extra/npm-ci.yml.svg?logo=github&label=CI&style=for-the-badge)](https://github.com/remscodes/ngx-testing-extra/actions/workflows/npm-ci.yml)
[![npm version](https://img.shields.io/npm/v/ngx-testing-extra.svg?style=for-the-badge&logo=npm)](https://www.npmjs.org/package/ngx-testing-extra)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ngx-testing-extra.svg?style=for-the-badge)](https://bundlephobia.com/package/ngx-testing-extra)
[![license](https://img.shields.io/github/license/remscodes/ngx-testing-extra.svg?style=for-the-badge)](LICENSE)

</div>

## Introduction

This library aims to reduce boilerplate for testing component, http response, guard and everything else related to the Angular mechanism.

All the utilities provided make it easy to read and carry out the tests.

## Installation

```shell
npm install ngx-testing-extra
```

## Table of contents

- [Component](#component)
  - [Instance](#instance)
  - [Native Element](#native-element)
  - [Debug Element](#debug-element)
  - [Event](#event)
- [Pipe](#pipe)
- [HTTP](#http)
  - [Response](#response)
  - [Interceptor](#interceptor)
- [Router](#router)
  - [Guard](#guard)
  - [Resolver](#resolver)
- [Injector](#injector)
- [Module](#module)

### Component

#### Instance

Query for one component instance :

`findComponent<T>(fixture: ComponentFixture, selectorOrDirective: string | Type<T>): T`

Query for all component instances :

`findAllComponents<T>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<T>): T[]`

#### Native element

Query for one native element :

`findElement<T extends HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T`

Query for all native elements :

`findAllElements<T extends HTMLElement>(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): T[]`

#### Debug element

Query for one debug element :

`findDebugElement(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement`

Query for all debug elements :

`findAllDebugElements(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): DebugElement[]`

#### Event

Trigger element click event :

`click(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>): void`

Trigger child component output :

`emitChildOutput(fixture: ComponentFixture<any>, selectorOrDirective: string | Type<any>, outputName: string, outputValue?: any): void`

### Pipe

Use jasmine `it` to test pipe transform based on the provided record :

`testPipeValues<T extends PipeTransform>(pipe: T, record: Record<any, string>): void`

### HTTP

#### Response

Intercept http request and make response succeed :

`emitFakeSuccessResponse(httpController: HttpTestingController, config: SuccessResponseConfig): void`

```ts
export interface SuccessResponseConfig {
  url: string;
  method: | 'GET'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'POST'
    | 'PUT'
    | 'PATCH';
  headers?: | HttpHeaders
    | { [name: string]: string | string[] };
  status?: number;
  statusText?: string;
  body: | ArrayBuffer
    | Blob
    | boolean
    | string
    | number
    | Object
    | (boolean | string | number | Object | null)[]
    | null;
}
```

Intercept http request and make response failed :

`emitFakeErrorResponse(httpController: HttpTestingController, config: ErrorResponseConfig): void`

```ts
export interface ErrorResponseConfig {
  url: string;
  method: | 'GET'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'POST'
    | 'PUT'
    | 'PATCH';
  status?: number;
  statusText?: string;
}
```

#### Interceptor

Make the provided interceptor succeed and observe the given `HttpEvent` :

`makeInterceptorSucceed(interceptor: HttpInterceptorFn, config?: SuccessInterceptorConfig): Observable<HttpEvent<unknown>>`

```ts
export interface SuccessInterceptorConfig {
  url: string;
  method?: 'GET' | 'HEAD' | 'DELETE' | 'OPTIONS' | 'JSONP';
}
```

Make the provided interceptor fail and observe the given `HttpEvent` :

`makeInterceptorFail(interceptor: HttpInterceptorFn, config?: ErrorInterceptorConfig): Observable<HttpEvent<unknown>>`

```ts
export interface ErrorInterceptorConfig {
  url?: string;
  status?: number;
}
```

### Router

#### Guard

Verify the behavior of the provided CanActivate guard for the given route config :

`challengeActivate(guard: CanActivateFn, state: RouterStateSnapshot, routeConfig?: RouteSnapshotConfig)`

```ts
export interface RouteSnapshotConfig {
  data?: Data;
  params?: Params;
  queryParams?: Params;
}
```

Verify the behavior of the provided CanDeactivate guard for the given route config :

`challengeDeactivate<T>(guard: CanDeactivateFn<T>, component: T, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot, routeConfig?: RouteSnapshotConfig)`

Verify the behavior of the provided CanMatch guard for the given route and segments :

`challengeMatch(guard: CanMatchFn, route: Route, segments: UrlSegment[])`

#### Resolver

Verify the provided resolver and observe the returned value :

`checkResolver<T>(resolver: ResolveFn<T>, state: RouterStateSnapshot, routeConfig?: RouteSnapshotConfig)`

### Injector

Get instance from fixture injector based on the provided token :

`fromInjector<T>(fixture: ComponentFixture<any>, directive: Type<T>): T`

### Module

Use jasmine `it` to test module creation :

`expectModuleToCreate<T>(Module: Type<T>, providers?: (Provider | EnvironmentProviders)[]): void`

## License

[MIT](LICENSE) © Rémy Abitbol.
