import { Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeRendererFactory } from '../common/test-beds/renderer/merge-renderer-factory';
import { DirectiveTestBedFactory } from './directive-test-bed-factory';
import { DirectiveTestBed, DirectiveTestBedOptions } from './models';

/**
 * Creates a new `DirectiveTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootDirective - The described Directive.
 * @param options
 */
export function directiveTestBed<T>(rootDirective: Type<T>, options: DirectiveTestBedOptions = {}): DirectiveTestBed<T> {
  const factory = new DirectiveTestBedFactory(rootDirective, options);

  const tb: DirectiveTestBed<T> = ((assertion) => {
    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      postTest: (tools) => {
        tools.rx['cleanAll']();
      },
    });
  }) as DirectiveTestBed<T>;

  return mergeRendererFactory(factory, tb) as DirectiveTestBed<T>;
}
