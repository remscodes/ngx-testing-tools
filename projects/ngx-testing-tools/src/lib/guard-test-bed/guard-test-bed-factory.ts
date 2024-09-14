import { Type } from '@angular/core';
import { assertFn } from '../common/assertions/assert-fn';
import { assertServiceCtor } from '../common/assertions/assert-service-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { HTTP_PROVIDERS } from '../common/tools/http/http-providers';
import { HttpOptions } from '../common/tools/http/models/http-options.model';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { isConstructor } from '../common/utils/constructor.util';
import { GuardTestBedOptions } from './models';
import { GuardCanFn } from './models/guard-can.model';
import { GuardProxy } from './proxy/guard-proxy';
import { GuardTools } from './tools';
import { buildGuardTools } from './tools/guard-tools';

export class GuardTestBedFactory<
  GuardType,
  Store extends InjectionStore = InjectionStore
> extends BaseTestBedFactory<
  GuardProxy,
  Store,
  GuardTools<GuardType, Store['injected']>
> {
  public constructor(
    rootGuard: Type<GuardType> | GuardCanFn,
    options: GuardTestBedOptions,
  ) {
    const isRootCtor = isConstructor(rootGuard);
    if (isRootCtor) assertServiceCtor(rootGuard);
    else assertFn(rootGuard);

    super(GuardProxy, options);

    const {
      httpTesting = false,
      verifyHttp = true,
    } = options;

    if (httpTesting) this.provide(HTTP_PROVIDERS);

    this.httpOptions = { httpTesting, verifyHttp };
  }

  private readonly httpOptions: Required<HttpOptions>;

  protected override deferredTools = () => buildGuardTools(this, this.httpOptions);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
