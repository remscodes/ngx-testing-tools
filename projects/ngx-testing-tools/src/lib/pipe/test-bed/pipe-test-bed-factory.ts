import { PipeTransform, Type } from '@angular/core';
import { assertPipeCtor } from '../../common/assertion/assert-pipe-ctor';
import { buildJasmineCallback } from '../../common/test-bed/jasmine/jasmine-callback';
import { RendererTestBedFactory } from '../../common/test-bed/renderer/renderer-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { PipeTestBedOptions } from './models';
import { PipeCallback } from './models/pipe-callback.model';
import { buildPipeTools } from './pipe-tools';

export class PipeTestBedFactory<PipeType extends PipeTransform, Store extends InjectionStore = InjectionStore> extends RendererTestBedFactory<PipeType, Store> {

  public constructor(
    rootPipe: Type<PipeType>,
    options: PipeTestBedOptions = {},
  ) {
    assertPipeCtor(rootPipe);
    super(rootPipe, options);

    this.provide(rootPipe);
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.injectDescribed();
  }

  public override setup(action: PipeCallback<PipeType, Store['injected']>): jasmine.ImplementationCallback {
    return buildJasmineCallback({
      callback: action,
      deferredTools: () => buildPipeTools(this),
    });
  }
}
