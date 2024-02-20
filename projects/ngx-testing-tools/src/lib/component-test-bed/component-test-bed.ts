import { Type } from '@angular/core';
import { buildJasmineCallback } from '../common/jasmine/jasmine-callback';
import { mergeRendererFactory } from '../common/test-beds/renderer/merge-renderer-factory';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { ComponentTestBed, ComponentTestBedOptions } from './models';

/**
 * Creates a new `ComponentTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootComponent - The described Component.
 * @param options
 */
export function componentTestBed<T>(rootComponent: Type<T>, options: ComponentTestBedOptions = {}): ComponentTestBed<T> {
  const factory = new ComponentTestBedFactory(rootComponent, options);

  const {
    httpTesting,
    verifyHttp: defaultVerifyHttp,
  } = factory['httpOptions'];

  const defaultStartDetectChanges = factory['startDetectChanges'];
  const noTemplate = factory['noTemplate'];

  const tb: ComponentTestBed<T> = ((assertion, opts = {}) => {
    const {
      startDetectChanges = defaultStartDetectChanges,
      verifyHttp = defaultVerifyHttp,
    } = opts;

    return buildJasmineCallback({
      callback: assertion,
      deferredTools: factory['deferredTools'],
      preTest: (tools) => {
        if (!noTemplate && startDetectChanges) tools.fixture.detectChanges();
      },
      postTest: (tools) => {
        if (httpTesting && verifyHttp) tools.http.controller.verify();
        tools.rx['cleanAll']();
      },
    });
  }) as ComponentTestBed<T>;

  return mergeRendererFactory(factory, tb);
}
