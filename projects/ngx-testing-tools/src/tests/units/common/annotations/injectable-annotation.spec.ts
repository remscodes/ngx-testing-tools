import { Directive, Injectable } from '@angular/core';
import { getInjectableAnnotation } from '../../../../lib/common/annotations/injectable-annotation';

describe('Injectable Annotation', () => {

  describe('getInjectableAnnotation', () => {

    it('should get annotation', () => {
      @Injectable()
      class FooService {}

      expect(getInjectableAnnotation(FooService)).toBeTruthy();
    });

    it('should not get annotation', () => {
      @Directive()
      class FooDirective {}

      expect(getInjectableAnnotation(FooDirective)).toBeNull();
    });

    it('should not get annotation', () => {
      class Foo {}

      expect(getInjectableAnnotation(Foo)).toBeNull();
    });
  });
});
