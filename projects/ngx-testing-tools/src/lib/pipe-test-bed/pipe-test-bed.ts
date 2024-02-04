import { PipeTransform, Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeRendererFactory } from '../common/test-beds/renderer/merge-renderer-factory';
import { PipeTestBed, PipeTestBedOptions } from './models';
import { PipeTestBedFactory } from './pipe-test-bed-factory';

/**
 * Creates a new `PipeTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootPipe - The described Pipe.
 * @param options
 */
export function pipeTestBed<T extends PipeTransform>(rootPipe: Type<T>, options: PipeTestBedOptions = {}): PipeTestBed<T> {
  const factory = new PipeTestBedFactory(rootPipe, options);

  const tb: PipeTestBed<T> = ((assertion) => {
    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      postTest: (tools) => {
        tools.rx['cleanAll']();
      },
    });
  }) as PipeTestBed<T>;

  return mergeRendererFactory(factory, tb) as PipeTestBed<T>;
}
