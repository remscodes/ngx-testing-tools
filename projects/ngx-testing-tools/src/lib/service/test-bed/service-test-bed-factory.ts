import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProviderToken, Type } from '@angular/core';
import { shouldCreate } from '../../common/expectation/should-create';
import { buildJasmineCallback } from '../../common/test-bed/action-callback';
import { BaseTestBedFactory } from '../../common/test-bed/base/base-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { assertService } from './assertions/assert-service';
import { assertServiceCtor } from './assertions/assert-service-ctor';
import { ServiceTestBed, ServiceTestBedOptions } from './models';
import { ServiceCallback } from './models/service-test-bed.model';
import { buildServiceTools } from './service-tools';

export class ServiceTestBedFactory<ServiceType, Store extends InjectionStore = InjectionStore> extends BaseTestBedFactory<ServiceType, Store> {

  public constructor(
    rootService: Type<ServiceType>,
    options: ServiceTestBedOptions = {},
  ) {
    assertServiceCtor(rootService);
    super(rootService, options);

    this.provide([
      this.described,
      provideHttpClient(),
      provideHttpClientTesting(),
    ]);
  }

  private service: ServiceType = null!;

  public override inject<S extends string, T>(name: NonEmptyString<S>, token: ProviderToken<T>): ServiceTestBed<ServiceType, InjectionStore<PrettyMerge<Store["injected"] & { [K in S]: T }>>> {
    return super.inject(name, token) as any;
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.service = this.injectDescribed();
  }

  public override setup(action: ServiceCallback<ServiceType, Store["injected"]>): jasmine.ImplementationCallback {
    return buildJasmineCallback(this, action, buildServiceTools);
  }

  public override shouldCreate(): void {
    shouldCreate(() => {
      assertService(this.service);
      return this.service;
    });
  }
}
