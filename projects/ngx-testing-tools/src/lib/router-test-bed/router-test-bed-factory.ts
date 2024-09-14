import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { RouterTestBedOptions } from './models';
import { RouterTools } from './tools';
import { buildRouterTools } from './tools/router-tools';

export class RouterTestBedFactory<
  RoutesConst extends Routes,
  Store extends InjectionStore = InjectionStore
> extends BaseTestBedFactory<
  Router,
  Store,
  RouterTools<RoutesConst, Store['injected']>
> {

  public constructor(
    routes: RoutesConst,
    options: RouterTestBedOptions,
  ) {
    super(Router, options);

    const {
      initialUrl = '',
      startDetectChanges = true,
    } = options;

    this._routes = routes;

    this.initialUrl = initialUrl;
    this.startDetectChanges = startDetectChanges;

    this.provide([
      provideRouter(routes),
      provideLocationMocks(),
    ]);

    this.createHarnessBeforeEachTest();
  }

  protected initialUrl: string;
  protected readonly startDetectChanges: boolean;

  private _routes: RoutesConst;
  private _harness: RouterTestingHarness = null!;

  protected override deferredTools = () => buildRouterTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }

  private createHarnessBeforeEachTest(): void {
    globalThis.beforeEach(async () => {
      this._harness = await RouterTestingHarness.create(this.initialUrl);
    });
  }
}
