import { Type } from '@angular/core';
import { assertModuleCtor } from '../common/assertions/assert-module-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { HTTP_PROVIDERS } from '../common/tools/http/http-providers';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { InterceptorTestBedOptions } from './models';
import { buildInterceptorTools } from './tools/interceptor-tools';

export class InterceptorTestBedFactory<ModuleType, Store extends InjectionStore = InjectionStore> extends BaseTestBedFactory<ModuleType, Store> {

  public constructor(
    rootModule: Type<ModuleType>,
    options: InterceptorTestBedOptions = {},
  ) {
    assertModuleCtor(rootModule);
    super(rootModule, options);

    this.provide(HTTP_PROVIDERS);
  }

  protected override deferredTools = () => buildInterceptorTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
