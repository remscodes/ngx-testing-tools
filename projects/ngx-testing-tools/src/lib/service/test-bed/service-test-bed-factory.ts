import { Type } from '@angular/core';
import { shouldCreate } from '../../common/expectation/should-create';
import { CommonTestBedFactory } from '../../common/test-bed/common-test-bed-factory';
import { InjectionStore } from '../../components';
import { ComponentSetup } from '../../components/test-bed/models/component-setup.model';
import { assertService } from './assert-service';

export class ServiceTestBedFactory<ServiceType, Store extends InjectionStore> extends CommonTestBedFactory<ServiceType, Store> {

  public constructor(
    rootService: Type<ServiceType>,
  ) {
    assertService(rootService);
    super(rootService);
  }

  private instance: ServiceType = null!;

  public override setup(action: ComponentSetup<ServiceType, InjectionStore["injected"]>): jasmine.ImplementationCallback {
    return super.setup(action as any);
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.testBed.inject(this.described);
  }

  public override shouldCreate(): void {
    shouldCreate(() => this.instance);
  }
}
