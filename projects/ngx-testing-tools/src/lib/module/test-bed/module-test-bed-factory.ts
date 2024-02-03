import { Type } from '@angular/core';
import { assertModuleCtor } from '../../common/assertion/assert-module-ctor';
import { BaseTestBedFactory } from '../../common/test-bed/base/base-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { ModuleTestBedOptions } from './models';
import { buildModuleTools } from './module-tools';

export class ModuleTestBedFactory<ModuleType, Store extends InjectionStore = InjectionStore> extends BaseTestBedFactory<ModuleType, Store> {

  public constructor(
    rootModule: Type<ModuleType>,
    options: ModuleTestBedOptions = {},
  ) {
    assertModuleCtor(rootModule);
    super(rootModule, options);
  }

  protected override deferredTools = () => buildModuleTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.injectDescribed();
  }
}
