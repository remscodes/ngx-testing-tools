import { Type } from '@angular/core';
import { HttpOptions } from '../../common/test-bed/http/models/http-options.model';
import { doneFactory } from '../../common/test-bed/jasmine-done';
import { mergeFactoryToTestBed } from '../../common/test-bed/merge-factory';
import { postAsync } from '../../common/util/post-async';
import { Nullable } from '../../shared.model';
import { ComponentTestBedFactory } from './component-test-bed-factory';
import { buildComponentTools } from './component-tools';
import { ComponentExtraOptions, ComponentTestBedOptions, ComponentTools } from './models';
import { ComponentCallback, ComponentTestBed } from './models/component-test-bed.models';

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

  const httpOptions: HttpOptions = { httpTesting };

  const factory = new ComponentTestBedFactory(rootComponent, options);

  const tb: ComponentTestBed<T> = ((assertion: ComponentCallback<T, any>, opts: ComponentExtraOptions = {}) => {
    const {
      startDetectChanges = globalStartDetectChanges ?? true,
      verifyHttp = globalVerifyHttp ?? true,
    } = opts;

    const assertionWrapper = (done: Nullable<DoneFn>) => {
      const tools: ComponentTools<T> = buildComponentTools(factory, httpOptions);

      if (!noTemplate && startDetectChanges) tools.fixture.detectChanges();

      const postTest = () => {
        if (httpTesting && verifyHttp) tools.http.controller.verify();
        tools.rx['cleanAll']();
      };

      return (done)
        ? assertion(tools, doneFactory(done, postTest))
        : postAsync(assertion(tools, null!), postTest);
    };

    return (assertion.length > 1)
      ? (done: DoneFn) => assertionWrapper(done)
      : () => assertionWrapper(null);
  }) as ComponentTestBed<T>;

  tb.declare = (declarations: any) => {
    factory.declare(declarations);
    return tb;
  };
  return mergeFactoryToTestBed(factory, tb) as ComponentTestBed<T>;
}
