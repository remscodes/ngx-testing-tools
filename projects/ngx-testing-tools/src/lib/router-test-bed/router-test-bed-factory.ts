import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { RouterTestBedOptions } from './models';
import { RouterTools } from './tools';
import { buildRouterTools } from './tools/router-tools';

class None {}

export class RouterTestBedFactory<
  RoutesConst extends Routes,
  Store extends InjectionStore = InjectionStore
> extends BaseTestBedFactory<None, Store, RouterTools<RoutesConst, Store['injected']>> {

  public constructor(
    routes: RoutesConst,
    options: RouterTestBedOptions = {},
  ) {
    super(None, options);

    this._routes = routes;

    this.provide([
      provideRouter(routes),
      provideLocationMocks(),
    ]);

    globalThis.beforeEach(async () => {
      this._harness = await RouterTestingHarness.create();
    });
  }

  private _routes: RoutesConst;
  private _harness: RouterTestingHarness = null!;

  protected override deferredTools = () => buildRouterTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
