import { PipeTransform, Type } from '@angular/core';
import { assertPipeCtor } from '../../common/assertion/assert-pipe-ctor';
import { RendererTestBedFactory } from '../../common/test-bed/renderer/renderer-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { PipeTestBedOptions } from './models';
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

  protected override deferredTools = () => buildPipeTools(this);

  public override async compile(): Promise<void> {
    await super.compile();
    this.instance = this.injectDescribed();
  }
}
