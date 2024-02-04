import { Type } from '@angular/core';
import { buildJasmineCallback } from '../common/test-bed/jasmine/jasmine-callback';
import { mergeRendererFactory } from '../common/test-bed/merge-factory/merge-renderer-factory';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { ComponentTestBed, ComponentTestBedOptions } from './models';

/**
 * Creates a new `ComponentTestBed` to configure the custom test bed and wrap the assertion test.
 * @param rootComponent - The described Component.
 * @param options
 */
export function componentTestBed<T>(rootComponent: Type<T>, options: ComponentTestBedOptions = {}): ComponentTestBed<T> {
  const {
    httpTesting = false,
    verifyHttp: globalVerifyHttp,
    noTemplate = false,
    startDetectChanges: globalStartDetectChanges,
  } = options;

  const factory = new ComponentTestBedFactory(rootComponent, options);

  const tb: ComponentTestBed<T> = ((assertion, opts = {}) => {
    const {
      startDetectChanges = globalStartDetectChanges ?? true,
      verifyHttp = globalVerifyHttp ?? true,
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

  return mergeRendererFactory(factory, tb) as ComponentTestBed<T>;
}
