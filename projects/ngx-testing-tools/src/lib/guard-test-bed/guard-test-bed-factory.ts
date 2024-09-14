import { assertFn } from '../common/assertions/assert-fn';
import { assertServiceCtor } from '../common/assertions/assert-service-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { HTTP_PROVIDERS } from '../common/tools/http/http-providers';
import { HttpOptions } from '../common/tools/http/models/http-options.model';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { isConstructor } from '../common/utils/constructor.util';
import { GuardTestBedOptions } from './models';
import { GuardCan, InternalGuardCan } from './models/guard-can.model';
import { ValidGuard } from './models/valid-guard.model';
import { GUARD_INFO, GuardInfo } from './proxy/guard-info.token';
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
    rootGuard: ValidGuard<GuardType>,
    options: GuardTestBedOptions & { type?: GuardCan },
  ) {
    const isRootCtor = isConstructor(rootGuard);
    if (isRootCtor) assertServiceCtor(rootGuard);
    else assertFn(rootGuard);

    super(GuardProxy, options);

    const {
      httpTesting = false,
      verifyHttp = true,
      type = 'ctor',
    } = options;

    this.type = type;

    this.provide([
      GuardProxy,
      { provide: GUARD_INFO, useValue: { rootGuard, isRootCtor } as GuardInfo },
    ]);

    if (httpTesting) this.provide(HTTP_PROVIDERS);

    this.httpOptions = { httpTesting, verifyHttp };
  }

  private readonly type: InternalGuardCan;
  private readonly httpOptions: Required<HttpOptions>;

  protected override deferredTools = () => buildGuardTools(this, this.httpOptions);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
