import { assertFn } from '../common/assertions/assert-fn';
import { assertResolverCtor } from '../common/assertions/assert-resolver-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { HTTP_PROVIDERS } from '../common/tools/http/http-providers';
import { HttpOptions } from '../common/tools/http/models/http-options.model';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { isConstructor } from '../common/utils/constructor.util';
import { ResolverTestBedOptions } from './models';
import { ValidResolver } from './models/valid-resolver.model';
import { RESOLVER_INFO, ResolverInfo } from './proxy/resolver-info.token';
import { ResolverProxy } from './proxy/resolver-proxy';
import { ResolverTools } from './tools';
import { buildResolverTools } from './tools/resolver-tools';

export class ResolverTestBedFactory<
  ResolverType,
  Store extends InjectionStore = InjectionStore
> extends BaseTestBedFactory<
  ResolverProxy,
  Store,
  ResolverTools<ResolverType, Store['injected']>
> {
  public constructor(
    resolver: ValidResolver<ResolverType>,
    options: ResolverTestBedOptions,
  ) {
    const isRootCtor = isConstructor(resolver);
    if (isRootCtor) assertResolverCtor(resolver);
    else assertFn(resolver);

    super(ResolverProxy, options);

    const {
      httpTesting = false,
      verifyHttp = true,
    } = options;

    this.provide([
      ResolverProxy,
      { provide: RESOLVER_INFO, useValue: { rootResolver: resolver, isRootCtor } as ResolverInfo },
    ]);

    if (isRootCtor) this.provide(resolver);
    if (httpTesting) this.provide(HTTP_PROVIDERS);

    this.httpOptions = { httpTesting, verifyHttp };
  }

  private readonly httpOptions: Required<HttpOptions>;

  protected override deferredTools = () => buildResolverTools(this, this.httpOptions);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
