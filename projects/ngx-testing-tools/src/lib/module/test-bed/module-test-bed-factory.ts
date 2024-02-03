import { Type } from '@angular/core';
import { assertModuleCtor } from '../../common/assertion/assert-module-ctor';
import { BaseTestBedFactory } from '../../common/test-bed/base/base-test-bed-factory';
import { buildJasmineCallback } from '../../common/test-bed/jasmine/jasmine-callback';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { ModuleTestBedOptions } from './models';
import { ModuleCallback } from './models/module-callback.model';
import { buildModuleTools } from './module-tools';

export class ModuleTestBedFactory<ModuleType, Store extends InjectionStore = InjectionStore> extends BaseTestBedFactory<ModuleType, Store> {

  public constructor(
    rootModule: Type<ModuleType>,
    options: ModuleTestBedOptions = {},
  ) {
    assertModuleCtor(rootModule);
    super(rootModule, options);
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.injectDescribed();
  }

  public override setup(action: ModuleCallback<ModuleType, Store["injected"]>): jasmine.ImplementationCallback {
    return buildJasmineCallback({
      callback: action,
      deferredTools: () => buildModuleTools(this),
    });
  }
}
