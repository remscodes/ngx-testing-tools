import { Type } from '@angular/core';
import { assertComponentCtor } from '../common/assertions/assert-component-ctor';
import { RendererTestBedFactory } from '../common/test-beds/renderer/renderer-test-bed-factory';
import { HTTP_PROVIDERS } from '../common/tools/http/http-providers';
import { HttpOptions } from '../common/tools/http/models/http-options.model';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { ComponentTestBedOptions } from './models';
import { ComponentTools } from './tools';
import { buildComponentTools } from './tools/component-tools';

export class ComponentTestBedFactory<
  ComponentType,
  Store extends InjectionStore = InjectionStore
> extends RendererTestBedFactory<ComponentType, Store, ComponentTools<ComponentType, Store['injected']>> {

  public constructor(
    rootComponent: Type<ComponentType>,
    options: ComponentTestBedOptions = {},
  ) {
    assertComponentCtor(rootComponent);
    super(rootComponent, rootComponent, options);

    const {
      httpTesting = false,
      verifyHttp = true,
    } = options;

    if (httpTesting) this.provide(HTTP_PROVIDERS);

    this.httpOptions = { httpTesting, verifyHttp };
  }

  private readonly httpOptions: Required<HttpOptions>;

  protected override deferredTools = () => buildComponentTools(this, this.httpOptions);

  public override async compile(): Promise<void> {
    await super.compile();
    this.createHostFixture();
  }
}
