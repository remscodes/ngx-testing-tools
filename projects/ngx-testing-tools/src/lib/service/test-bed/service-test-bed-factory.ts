import { ProviderToken, Type } from '@angular/core';
import { shouldCreate } from '../../common/expectation/should-create';
import { CustomTestBedFactory } from '../../common/test-bed/custom-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { assertService } from './assert-service';
import { ServiceTestBed } from './models';
import { ServiceSetup } from './models/service-setup.model';
import { buildServiceTools } from './service-tools';

export class ServiceTestBedFactory<ServiceType, Store extends InjectionStore = InjectionStore> extends CustomTestBedFactory<ServiceType, Store> {

  public constructor(rootService: Type<ServiceType>) {
    assertService(rootService);
    super(rootService);
    this.provide(this.described);
  }

  private instance: ServiceType = null!;

  public override inject<S extends string, T>(name: NonEmptyString<S>, token: ProviderToken<T>): ServiceTestBed<ServiceType, InjectionStore<PrettyMerge<Store["injected"] & { [K in S]: T }>>> {
    return super.inject(name, token) as any;
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.testBed.inject(this.described);
  }

  public override setup(action: ServiceSetup<ServiceType, InjectionStore["injected"]>): jasmine.ImplementationCallback {
    return (action.length > 1)
      ? (done: DoneFn) => action(buildServiceTools(this), done)
      : () => action(buildServiceTools(this), null!);
  }

  public override shouldCreate(): void {
    shouldCreate(() => this.instance);
  }
}
