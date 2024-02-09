import { Type } from '@angular/core';
import { assertServiceCtor } from '../common/assertions/assert-service-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { HTTP_PROVIDERS } from '../common/tools/http/http-providers';
import { HttpOptions } from '../common/tools/http/models/http-options.model';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { ServiceTestBedOptions } from './models';
import { ServiceTools } from './tools';
import { buildServiceTools } from './tools/service-tools';

export class ServiceTestBedFactory<
  ServiceType,
  Store extends InjectionStore = InjectionStore
> extends BaseTestBedFactory<ServiceType, Store, ServiceTools<ServiceType, Store['injected']>> {

  public constructor(
    rootService: Type<ServiceType>,
    options: ServiceTestBedOptions = {},
  ) {
    assertServiceCtor(rootService);
    super(rootService, options);

    const {
      httpTesting = false,
      verifyHttp = true,
    } = options;

    this.httpOptions = { httpTesting, verifyHttp };

    if (httpTesting) this.provide(HTTP_PROVIDERS);

    this.provide(this.described);
  }

  private readonly httpOptions: Required<HttpOptions>;

  protected override deferredTools = () => buildServiceTools(this, this.httpOptions);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
