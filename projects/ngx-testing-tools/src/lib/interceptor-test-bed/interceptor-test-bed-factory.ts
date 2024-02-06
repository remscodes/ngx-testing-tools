import { HTTP_INTERCEPTORS, HttpInterceptorFn, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { Type } from '@angular/core';
import { assertFn } from '../common/assertions/assert-fn';
import { assertServiceCtor } from '../common/assertions/assert-service-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { httpProviders } from '../common/tools/http/http-providers';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { isConstructor } from '../common/utils/constructor.util';
import { InterceptorTestBedOptions } from './models';
import { INTERCEPTOR_INFO, InterceptorInfo } from './proxy/interceptor-info';
import { InterceptorProxy } from './proxy/interceptor-proxy';
import { InterceptorTools } from './tools';
import { buildInterceptorTools } from './tools/interceptor-tools';

export class InterceptorTestBedFactory<InterceptorType, Store extends InjectionStore = InjectionStore>
  extends BaseTestBedFactory<InterceptorProxy, Store, InterceptorTools<InterceptorType, Store['injected']>> {

  public constructor(
    rootInterceptor: Type<InterceptorType> | HttpInterceptorFn,
    options: InterceptorTestBedOptions = {},
  ) {
    const isRootCtor = isConstructor(rootInterceptor);
    (isRootCtor)
      ? assertServiceCtor(rootInterceptor)
      : assertFn(rootInterceptor);

    super(InterceptorProxy, options);

    this.provide([
      InterceptorProxy,
      { provide: INTERCEPTOR_INFO, useValue: { rootInterceptor, isRootCtor } as InterceptorInfo },
    ]);

    if (isRootCtor) {
      this.provide([
        rootInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: rootInterceptor },
        httpProviders(withInterceptorsFromDi()),
      ]);
    }
    else {
      this.provide(httpProviders(withInterceptors([rootInterceptor])));
    }
  }

  protected override deferredTools = () => buildInterceptorTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
