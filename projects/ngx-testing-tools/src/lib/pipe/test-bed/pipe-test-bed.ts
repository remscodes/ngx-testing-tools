import { PipeTransform, Type } from '@angular/core';
import { buildJasmineCallback } from '../../common/test-bed/jasmine/jasmine-callback';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { PipeTestBed, PipeTestBedOptions } from './models';
import { PipeCallback } from './models/pipe-test-bed.models';
import { PipeTestBedFactory } from './pipe-test-bed-factory';
import { buildPipeTools } from './pipe-tools';

/**
 * Creates a new `PipeTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootPipe - The described Pipe.
 * @param options
 */
export function pipeTestBed<T extends PipeTransform>(rootPipe: Type<T>, options: PipeTestBedOptions = {}): PipeTestBed<T> {
  const factory = new PipeTestBedFactory(rootPipe, options);

  const tb: PipeTestBed<T> = ((assertion: PipeCallback<T, any>) => {
    return buildJasmineCallback({
      callback: assertion,
      deferredTools: () => buildPipeTools(factory),
      postTest: (tools) => {
        tools.rx['cleanAll']();
      },
    });
  }) as PipeTestBed<T>;

  tb.declare = (declarations: any) => {
    factory.declare(declarations);
    return tb;
  };
  return mergeFactoryToTestBed(factory, tb) as PipeTestBed<T>;
}
