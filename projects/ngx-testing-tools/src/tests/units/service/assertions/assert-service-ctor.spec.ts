import { Directive, Injectable } from '@angular/core';
import { assertServiceCtor } from '../../../../lib/common/assertions/assert-service-ctor';

describe('assertServiceCtor', () => {
  @Injectable()
  class AppService {}

  @Directive({ selector: '', standalone: true })
  class AppDirective {}

  it('should pass', () => {
    expect(() => assertServiceCtor(AppService))
      .not.toThrowError();
  });

  it('should throw error with AppDirective indication', () => {
    expect(() => assertServiceCtor(AppDirective))
      .toThrowError('The provided "AppDirective" is not a Injectable Service. The ServiceTestBed cannot be created.');
  });

  it('should throw error with AppDirective indication', () => {
    expect(() => assertServiceCtor({} as any))
      .toThrowError('The provided "[object Object]" is not a Injectable Service. The ServiceTestBed cannot be created.');
  });
});
