import { Directive, NgModule } from '@angular/core';
import { getNgModuleAnnotation } from '../../../../lib/common/annotations/ng-module-annotation';

describe('NgModule Annotation', () => {

  describe('getNgModuleAnnotation', () => {

    it('should get annotation', () => {
      @NgModule()
      class FooNgModule {}

      expect(getNgModuleAnnotation(FooNgModule)).toBeTruthy();
    });

    it('should not get annotation', () => {
      @Directive()
      class FooDirective {}

      expect(getNgModuleAnnotation(FooDirective)).toBeNull();
    });

    it('should not get annotation', () => {
      class Foo {}

      expect(getNgModuleAnnotation(Foo)).toBeNull();
    });
  });
});
