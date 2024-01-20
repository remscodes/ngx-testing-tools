import { Component, Directive } from '@angular/core';
import { assertComponent } from '../../../../lib/component/test-bed/assertions/assert-component';

describe('assertComponent', () => {
  @Component({ template: ``, standalone: true })
  class AppComponent {}

  @Directive({ selector: '', standalone: true })
  class AppDirective {}

  it('should pass', () => {
    expect(() => assertComponent(AppComponent))
      .not.toThrowError();
  });

  it('should throw error with AppDirective indication', () => {
    expect(() => assertComponent(AppDirective))
      .toThrowError('The provided "AppDirective" is not a Component. The ComponentTestBed cannot be created.');
  });

  it('should throw error with [object Object] indication', () => {
    expect(() => assertComponent({} as any))
      .toThrowError('The provided "[object Object]" is not a Component. The ComponentTestBed cannot be created.');
  });
});
