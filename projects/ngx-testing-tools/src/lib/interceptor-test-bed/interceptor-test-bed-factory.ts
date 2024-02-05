import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { assertFn } from '../common/assertions/assert-fn';
import { assertServiceCtor } from '../common/assertions/assert-service-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { HTTP_PROVIDERS } from '../common/tools/http/http-providers';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { isConstructor } from '../common/utils/constructor.util';
import { InterceptorTestBedOptions } from './models';
import { InterceptorTools } from './tools';
import { buildInterceptorTools } from './tools/interceptor-tools';
import { InterceptorWrapper } from './tools/models/interceptor-wrapper.model';

export class InterceptorTestBedFactory<InterceptorType, Store extends InjectionStore = InjectionStore>
  extends BaseTestBedFactory<InterceptorWrapper<InterceptorType>, Store, InterceptorTools<InterceptorType, Store['injected']>> {

  public constructor(
    rootInterceptor: Type<InterceptorType> | HttpInterceptorFn,
    options: InterceptorTestBedOptions = {},
  ) {

    const isRootCtor = isConstructor(rootInterceptor);
    (isRootCtor)
      ? assertServiceCtor(rootInterceptor)
      : assertFn(rootInterceptor);

    @Injectable()
    class InterceptorWrapperImpl implements InterceptorWrapper<InterceptorType | HttpInterceptorFn>, HttpInterceptor {

      public isRootCtor = isRootCtor;

      public readonly rootInstance: InterceptorType | HttpInterceptorFn = (isRootCtor)
        ? TestBed.inject(rootInterceptor) // TODO: use BaseTestBedFactory.testBed
        : rootInterceptor;

      public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return (isRootCtor)
          ? (this.rootInstance as HttpInterceptor).intercept(req, next)
          : (this.rootInstance as HttpInterceptorFn)(req, next.handle);
      }
    }

    super(InterceptorWrapperImpl as any, options);

    if (isRootCtor) this.provide(rootInterceptor);
    this.provide(InterceptorWrapperImpl);
    this.provide(HTTP_PROVIDERS);
  }

  protected override deferredTools = () => buildInterceptorTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
