import { ElementRef, Type, ViewContainerRef } from '@angular/core';
import { assertDirectiveCtor } from '../common/assertions/assert-directive-ctor';
import { RendererTestBedFactory } from '../common/test-beds/renderer/renderer-test-bed-factory';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { HostElementRef } from './host/host-element-ref';
import { HOST_FIXTURE } from './host/host-fixture.token';
import { DirectiveTestBedOptions } from './models';
import { DirectiveTools } from './tools';
import { buildDirectiveTools } from './tools/directive-tools';

export class DirectiveTestBedFactory<
  DirectiveType,
  HostType,
  Store extends InjectionStore = InjectionStore
> extends RendererTestBedFactory<DirectiveType, Store, DirectiveTools<DirectiveType, HostType, Store['injected']>, HostType> {

  public constructor(
    rootDirective: Type<DirectiveType>,
    hostComponent: Type<HostType>,
    options: DirectiveTestBedOptions,
  ) {
    assertDirectiveCtor(rootDirective);
    super(rootDirective, hostComponent, options);

    this.provide([
      rootDirective,
      { provide: HOST_FIXTURE, useFactory: () => this.fixture },
      { provide: ElementRef, useClass: HostElementRef },
      ViewContainerRef,
    ]);
  }

  protected override deferredTools = () => buildDirectiveTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.createHostFixture();
    this.injectDescribed();
  }
}
