import { Component, Directive } from '@angular/core';
import { assertComponent } from '../../../../lib/components/test-bed/assert-component';
import { getFirstAnnotation } from '../../../fixtures/helpers/annotations/get-first-annotation';

describe('assertComponent', () => {

  it('should pass', () => {
    @Component({ template: `` })
    class AppComponent {}

    const annotation = getFirstAnnotation<Component>(AppComponent);

    expect(() => assertComponent(AppComponent, annotation))
      .not.toThrowError();
  });

  it('should throw error', () => {
    @Directive({ selector: '' })
    class AppDirective {}

    const annotation = getFirstAnnotation<Directive>(AppDirective);

    expect(() => assertComponent(AppDirective, annotation))
      .toThrowError('The provided "AppDirective" is not a Component. Cannot create a ComponentTestBed.');
  });
});
