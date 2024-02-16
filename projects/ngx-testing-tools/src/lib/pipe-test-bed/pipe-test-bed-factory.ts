import { PipeTransform, Type } from '@angular/core';
import { assertPipeCtor } from '../common/assertions/assert-pipe-ctor';
import { BaseTestBedFactory } from '../common/test-beds/base/base-test-bed-factory';
import { InjectionStore } from '../common/tools/store/models/injected-store.model';
import { PipeTestBedOptions } from './models';
import { PipeTools } from './tools';
import { buildPipeTools } from './tools/pipe-tools';

export class PipeTestBedFactory<
  PipeType extends PipeTransform,
  Store extends InjectionStore = InjectionStore
> extends BaseTestBedFactory<PipeType, Store, PipeTools<PipeType, Store['injected']>> {

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
    this.injectDescribed();
  }
}
