import { Type } from '@angular/core';
import { assertModuleCtor } from '../common/assertions/assert-module-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { ModuleTestBedOptions } from './models';
import { ModuleTools } from './tools';
import { buildModuleTools } from './tools/module-tools';

export class ModuleTestBedFactory<
  ModuleType,
  Store extends InjectionStore = InjectionStore
> extends BaseTestBedFactory<ModuleType, Store, ModuleTools<ModuleType, Store['injected']>> {

  public constructor(
    rootModule: Type<ModuleType>,
    options: ModuleTestBedOptions = {},
  ) {
    assertModuleCtor(rootModule);
    super(rootModule, options);

    this.import(rootModule);
  }

  protected override deferredTools = () => buildModuleTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
