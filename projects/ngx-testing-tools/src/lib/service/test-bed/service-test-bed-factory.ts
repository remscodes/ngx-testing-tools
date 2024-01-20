import { ProviderToken, Type } from '@angular/core';
import { shouldCreate } from '../../common/expectation/should-create';
import { CommonTestBedFactory } from '../../common/test-bed/common-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store';
import { NonEmptyString, PrettyMerge } from '../../models/shared.model';
import { assertService } from './assert-service';
import { ServiceTestBed } from './models';
import { ServiceSetup } from './models/service-setup.model';
import { buildServiceTools } from './service-tools';

export class ServiceTestBedFactory<ServiceType, Store extends InjectionStore = InjectionStore> extends CommonTestBedFactory<ServiceType, Store> {

  public constructor(rootService: Type<ServiceType>) {
    assertService(rootService);
    super(rootService);
    this.provide(this.described);
  }

  private instance: ServiceType = null!;

  public override setup(action: ServiceSetup<ServiceType, InjectionStore["injected"]>): jasmine.ImplementationCallback {
    return (action.length > 1)
      ? (done: DoneFn) => action(buildServiceTools(this), done)
      : () => action(buildServiceTools(this), null!);
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.testBed.inject(this.described);
  }

  public override shouldCreate(): void {
    shouldCreate(() => this.instance);
  }

  public override inject<S extends string, T>(name: NonEmptyString<S>, token: ProviderToken<T>): ServiceTestBed<ServiceType, InjectionStore<PrettyMerge<Store["injected"] & { [K in S]: T }>>> {
    return super.inject(name, token) as any;
  }
}
