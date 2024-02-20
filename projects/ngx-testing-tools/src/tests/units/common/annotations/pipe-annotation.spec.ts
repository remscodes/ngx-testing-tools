import { Directive, Pipe } from '@angular/core';
import { getPipeAnnotation } from '../../../../lib/common/annotations/pipe-annotation';

describe('Pipe Annotation', () => {

  describe('getPipeAnnotation', () => {

    it('should get annotation', () => {
      @Pipe({ name: 'foo' })
      class FooPipe {}

      expect(getPipeAnnotation(FooPipe)).toBeTruthy();
    });

    it('should not get annotation', () => {
      @Directive()
      class FooDirective {}

      expect(getPipeAnnotation(FooDirective)).toBeNull();
    });

    it('should not get annotation', () => {
      class Foo {}

      expect(getPipeAnnotation(Foo)).toBeNull();
    });
  });
});
