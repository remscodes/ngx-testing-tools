import { ProviderToken, Type } from '@angular/core';
import { shouldCreate } from '../../common/expectation/should-create';
import { CustomTestBedFactory } from '../../common/test-bed/custom-test-bed-factory';
import { DeclarativeTestBedFactory } from '../../common/test-bed/declarative-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { assertModuleCtor } from './assertions/assert-module-ctor';
import { ModuleSetup } from './models/module-setup.model';
import { ModuleTestBedOptions } from './models/module-test-bed-options.model';
import { ModuleTestBed } from './models/module-test-bed.model';
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

  public override setup(action: ModuleSetup<ModuleType, Store["injected"]>): jasmine.ImplementationCallback {
    return (action.length > 1)
      ? (done: DoneFn) => action(buildModuleTools(this), done)
      : () => action(buildModuleTools(this), null!);
  }

  public override shouldCreate(): void {
    shouldCreate(() => this.module);
  }
}
