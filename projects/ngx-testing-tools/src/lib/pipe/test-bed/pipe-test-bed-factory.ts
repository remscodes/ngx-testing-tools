import { ProviderToken, Type } from '@angular/core';
import { assertInstance } from '../../common/assertion/assert-instance';
import { assertPipeCtor } from '../../common/assertion/assert-pipe-ctor';
import { shouldCreate } from '../../common/expectation/should-create';
import { buildJasmineCallback } from '../../common/test-bed/jasmine/jasmine-callback';
import { RendererTestBedFactory } from '../../common/test-bed/renderer/renderer-test-bed-factory';
import { InjectionStore } from '../../common/test-bed/store/models/injected-store.model';
import { NonEmptyString, PrettyMerge } from '../../shared.model';
import { PipeTestBed, PipeTestBedOptions } from './models';
import { PipeCallback } from './models/pipe-test-bed.models';
import { buildPipeTools } from './pipe-tools';

export class PipeTestBedFactory<PipeType, Store extends InjectionStore = InjectionStore> extends RendererTestBedFactory<PipeType, Store> {

  public constructor(
    rootPipe: Type<PipeType>,
    options: PipeTestBedOptions = {},
  ) {
    assertPipeCtor(rootPipe);
    super(rootPipe, options);

    this.provide(rootPipe);
  }

  private pipe: PipeType = null!;

  public override inject<S extends string, T>(name: NonEmptyString<S>, token: ProviderToken<T>): PipeTestBed<PipeType, InjectionStore<PrettyMerge<Store['injected'] & { [K in S]: T }>>> {
    return super.inject(name, token) as any;
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.pipe = this.injectDescribed();
  }

  public override setup(action: PipeCallback<PipeType, Store['injected']>): jasmine.ImplementationCallback {
    return buildJasmineCallback({
      callback: action,
      deferredTools: () => buildPipeTools(this),
    });
  }

  public override shouldCreate(): void {
    shouldCreate(() => {
      assertInstance(this.pipe, this.described);
      return this.pipe;
    });
  }
}
