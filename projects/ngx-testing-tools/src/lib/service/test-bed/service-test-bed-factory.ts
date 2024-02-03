import { Type } from '@angular/core';
import { assertServiceCtor } from '../../common/assertion/assert-service-ctor';
import { BaseTestBedFactory } from '../../common/test-bed/base/base-test-bed-factory';
import { HTTP_PROVIDERS } from '../../common/test-bed/http/http-providers';
import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { buildJasmineCallback } from '../../common/test-bed/jasmine/jasmine-callback';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { ServiceTestBedOptions } from './models';
import { ServiceCallback } from './models/service-callback.model';
import { buildServiceTools } from './service-tools';

export class ServiceTestBedFactory<ServiceType, Store extends InjectionStore = InjectionStore> extends BaseTestBedFactory<ServiceType, Store> {

  public constructor(
    rootService: Type<ServiceType>,
    options: ServiceTestBedOptions = {},
  ) {
    assertServiceCtor(rootService);
    super(rootService, options);

    const {
      httpTesting = false,
    } = options;

    if (httpTesting) this.provide(HTTP_PROVIDERS);

    this.provide(this.described);
    this.httpOptions = { httpTesting };
  }

  private readonly httpOptions: HttpOptions;

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.injectDescribed();
  }

  public override setup(action: ServiceCallback<ServiceType, Store["injected"]>): jasmine.ImplementationCallback {
    return buildJasmineCallback({
      callback: action,
      deferredTools: () => buildServiceTools(this, this.httpOptions),
    });
  }
}
