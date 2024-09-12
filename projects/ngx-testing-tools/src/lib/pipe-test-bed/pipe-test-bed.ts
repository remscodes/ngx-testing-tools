import { PipeTransform, Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeBaseFactory } from '../common/test-beds/base/merge-base-factory';
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

  return mergeBaseFactory(factory, tb);
}

/**
 * Only invokes the "should create" test.
 *
 * To be used when there are no apparent or consistent tests to be performed on this pipe.
 *
 * The usage of this function and `pipeTestBed` function must be mutually exclusive.
 *
 * @param rootPipe - The described Pipe.
 * @param options
 */
export function itShouldCreatePipe<T extends PipeTransform>(rootPipe: Type<T>, options: ItShouldCreateOptions = {}): void {
  pipeTestBed(rootPipe, options);
}

type ItShouldCreateOptions = Pick<PipeTestBedOptions,
  | 'providers'
  | 'imports'
>
