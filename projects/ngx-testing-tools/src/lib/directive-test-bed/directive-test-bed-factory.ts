import { Type } from '@angular/core';
import { assertDirectiveCtor } from '../common/assertions/assert-directive-ctor';
import { RendererTestBedFactory } from '../common/test-beds/renderer/renderer-test-bed-factory';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { DirectiveTestBedOptions } from './models';
import { DirectiveTools } from './tools';
import { buildDirectiveTools } from './tools/directive-tools';

export class DirectiveTestBedFactory<DirectiveType, Store extends InjectionStore = InjectionStore> extends RendererTestBedFactory<DirectiveType, Store, DirectiveTools<DirectiveType, Store['injected']>> {

  public constructor(
    rootDirective: Type<DirectiveType>,
    options: DirectiveTestBedOptions = {},
  ) {
    assertDirectiveCtor(rootDirective);
    super(rootDirective, options);
  }

  protected override deferredTools = () => buildDirectiveTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.injectDescribed();
  }
}
