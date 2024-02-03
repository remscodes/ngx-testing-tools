import { Type } from '@angular/core';
import { assertServiceCtor } from '../../common/assertion/assert-service-ctor';
import { BaseTestBedFactory } from '../../common/test-bed/base/base-test-bed-factory';
import { HTTP_PROVIDERS } from '../../common/test-bed/http/http-providers';
import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { ServiceTestBedOptions, ServiceTools } from './models';
import { buildServiceTools } from './service-tools';

export class ServiceTestBedFactory<ServiceType, Store extends InjectionStore = InjectionStore> extends BaseTestBedFactory<ServiceType, Store, ServiceTools<ServiceType, Store['injected']>> {

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

  protected override deferredTools = () => buildServiceTools(this, this.httpOptions);

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.injectDescribed();
  }
}
