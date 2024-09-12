import { Component, Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeRendererFactory } from '../common/test-beds/renderer/merge-renderer-factory';
import { DirectiveTestBedFactory } from './directive-test-bed-factory';
import { DirectiveTestBed, DirectiveTestBedOptions } from './models';

/**
 * Creates a new `DirectiveTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootDirective - The described Directive.
 * @param hostComponent - The host component on which the directive is tested.
 * @param options
 */
export function directiveTestBed<T, H>(rootDirective: Type<T>, hostComponent: Type<H>, options: DirectiveTestBedOptions = {}): DirectiveTestBed<T, H> {
  const factory = new DirectiveTestBedFactory(rootDirective, hostComponent, options);

  const defaultStartDetectChanges = factory['startDetectChanges'];
  const noTemplate = factory['noTemplate'];

  const tb: DirectiveTestBed<T, H> = ((assertion, opts = {}) => {
    const { startDetectChanges = defaultStartDetectChanges } = opts;

    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      preTest: (tools) => {
        if (!noTemplate && startDetectChanges) tools.fixture.detectChanges();
      },
      postTest: (tools) => {
        tools.rx['cleanAll']();
      },
    });
  }) as DirectiveTestBed<T, H>;

  return mergeRendererFactory(factory, tb);
}

/**
 * Only invokes the "should create" test.
 *
 * To be used when there are no apparent or relevant tests to be performed on this directive.
 *
 * The usage of this function and `directiveTestBed` function must be mutually exclusive.
 *
 * @param rootDirective - The described Directive.
 * @param options
 */
export function itShouldCreateDirective<T>(rootDirective: Type<T>, options: itShouldCreateOptions = {}): void {
  @Component({ template: '', standalone: true })
  class HostComponent {}

  directiveTestBed(rootDirective, HostComponent, options);
}

type itShouldCreateOptions = Pick<DirectiveTestBedOptions,
  | 'imports'
  | 'providers'
  | 'declarations'
  | 'schemas'
>
