import { Component, Directive } from '@angular/core';
import { assertComponent } from '../../../../lib/components/test-bed/assert-component';
import { getFirstAnnotation } from '../../../fixtures/helpers/annotations/get-first-annotation';

describe('assertComponent', () => {
  @Component({ template: ``, standalone: true })
  class AppComponent {}

  @Directive({ selector: '', standalone: true })
  class AppDirective {}

  it('should pass', () => {
    const annotation = getFirstAnnotation<Component>(AppComponent);

    expect(() => assertComponent(AppComponent, annotation))
      .not.toThrowError();
  });

  it('should throw error with AppDirective indication', () => {
    const annotation = getFirstAnnotation<Directive>(AppDirective);

    expect(() => assertComponent(AppDirective, annotation))
      .toThrowError('The provided "AppDirective" is not a Component. The ComponentTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    const annotation = getFirstAnnotation<Directive>(AppDirective);

    expect(() => assertComponent({} as any, annotation))
      .toThrowError('The provided "[object Object]" is not a Component. The ComponentTestBed cannot be created.');
  });
});
