import { ProviderToken, Type } from '@angular/core';
import { shouldCreate } from '../../common/expectation/should-create';
import { CommonTestBedFactory } from '../../common/test-bed/common-test-bed-factory';
import { InjectionStore } from '../../components';
import { NonEmptyString, PrettyMerge } from '../../models/shared.model';
import { assertService } from './assert-service';
import { ServiceTestBed } from './models';
import { ServiceSetup } from './models/service-setup.model';

export class ServiceTestBedFactory<ServiceType, Store extends InjectionStore = InjectionStore> extends CommonTestBedFactory<ServiceType, Store> {

  public constructor(rootService: Type<ServiceType>) {
    assertService(rootService);
    super(rootService);
    this.provide(this.described);
  }

  private instance: ServiceType = null!;

  public override setup(action: ServiceSetup<ServiceType, InjectionStore["injected"]>): jasmine.ImplementationCallback {
    return super.setup(action as any);
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.testBed.inject(this.described);
  }

  public override shouldCreate(): void {
    shouldCreate(() => this.instance);
  }

  public override inject<key extends string, T>(name: NonEmptyString<key>, token: ProviderToken<T>): ServiceTestBed<ServiceType, InjectionStore<PrettyMerge<Store["injected"] & { [k in key]: T }>>> {
    return super.inject(name, token) as any;
  }
}
