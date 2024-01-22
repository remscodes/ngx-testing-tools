import { ProviderToken, Type } from '@angular/core';
import { shouldCreate } from '../../common/expectation/should-create';
import { buildJasmineCallback } from '../../common/test-bed/action-callback';
import { DeclarativeTestBedFactory } from '../../common/test-bed/declarative-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { assertModule } from './assertions/assert-module';
import { assertModuleCtor } from './assertions/assert-module-ctor';
import { ModuleTestBed, ModuleTestBedOptions } from './models';
import { ModuleCallback } from './models/module-test-bed.model';
import { buildModuleTools } from './module-tools';

export class ModuleTestBedFactory<ModuleType, Store extends InjectionStore = InjectionStore> extends DeclarativeTestBedFactory<ModuleType, Store> {

  public constructor(
    rootModule: Type<ModuleType>,
    options: ModuleTestBedOptions = {},
  ) {
    assertModuleCtor(rootModule);
    super(rootModule, options);
  }

  private module: ModuleType = null!;

  public override inject<key extends string, T>(name: NonEmptyString<key>, token: ProviderToken<T>): ModuleTestBed<ModuleType, InjectionStore<PrettyMerge<Store["injected"] & { [k in key]: T }>>> {
    return super.inject(name, token) as any;
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.module = this.injectDescribed();
  }

  public override setup(action: ModuleCallback<ModuleType, Store["injected"]>): jasmine.ImplementationCallback {
    return buildJasmineCallback(this, action, buildModuleTools);
  }

  public override shouldCreate(): void {
    shouldCreate(() => {
      assertModule(this.module);
      return this.module;
    });
  }
}
