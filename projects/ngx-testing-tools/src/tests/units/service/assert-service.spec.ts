import { Directive, Injectable } from '@angular/core';
import { assertService } from '../../../lib/service/test-bed/assert-service';

describe('assertService', () => {
  @Injectable()
  class AppService {}

  @Directive({ selector: '', standalone: true })
  class AppDirective {}

  it('should pass', () => {
    expect(() => assertService(AppService))
      .not.toThrowError();
  });

  it('should throw error with AppDirective indication', () => {
    expect(() => assertService(AppDirective))
      .toThrowError('The provided "AppDirective" is not a Injectable Service. The ServiceTestBed cannot be created.');
  });

  it('should throw error with AppDirective indication', () => {
    expect(() => assertService({} as any))
      .toThrowError('The provided "[object Object]" is not a Injectable Service. The ServiceTestBed cannot be created.');
  });
});
