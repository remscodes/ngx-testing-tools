import { Type } from '@angular/core';
import { assertServiceCtor } from '../common/assertions/assert-service-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { HTTP_PROVIDERS } from '../common/tools/http/http-providers';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { InterceptorTestBedOptions } from './models';
import { InterceptorTools } from './tools';
import { buildInterceptorTools } from './tools/interceptor-tools';

export class InterceptorTestBedFactory<InterceptorType, Store extends InjectionStore = InjectionStore> extends BaseTestBedFactory<InterceptorType, Store, InterceptorTools<InterceptorType, Store['injected']>> {

  public constructor(
    rootInterceptor: Type<InterceptorType>,
    options: InterceptorTestBedOptions = {},
  ) {
    assertServiceCtor(rootInterceptor);
    super(rootInterceptor, options);

    this.provide(HTTP_PROVIDERS);
  }

  protected override deferredTools = () => buildInterceptorTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
