import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { findAllDebugElements } from '../../../../lib/components';
import { InnerComponent } from '../../../fixtures/components/inner.component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../../fixtures/directives/my-button.directive';
import { NoWhereDirective } from '../../../fixtures/directives/no-where.directive';
import { createOuterComponentFixture } from '../../../fixtures/helpers/configuration/create-outer-component-fixture';
import { validateArray } from '../../../fixtures/helpers/validators/validate-array';
import { validateInstanceType } from '../../../fixtures/helpers/validators/validate-instance-type';

describe('findAllDebugElements', () => {
  let fixture: ComponentFixture<OuterComponent>;
  let component: OuterComponent;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('InnerComponent', () => {

    beforeEach(() => {
      component.extraInner = true;
      fixture.detectChanges();
    });

    it('should find all InnerComponent debug elements by selector', () => {
      const debugs = findAllDebugElements(fixture, 'app-inner');
      validateArrayOfDebugElements(debugs);
    });

    it('should find all InnerComponent debug elements by directive', () => {
      const debugs = findAllDebugElements(fixture, InnerComponent);
      validateArrayOfDebugElements(debugs);
    });
  });

  describe('HTMLButtonElement', () => {

    it('should not find all button debug elements by selector', () => {
      const debugs = findAllDebugElements(fixture, 'button');
      validateArrayOfDebugElements(debugs);
    });

    it('should not find all button debug element by directive', () => {
      const debugs = findAllDebugElements(fixture, MyButtonDirective);
      validateArrayOfDebugElements(debugs);
    });
  });

  it('should not find all debug elements by selector', () => {
    expect(() => findAllDebugElements(fixture, 'app-no-where'))
      .toThrowError('Cannot find many DebugElement with : selector "app-no-where".');
  });

  it('should not find all debug elements by directive', () => {
    expect(() => findAllDebugElements(fixture, NoWhereDirective))
      .toThrowError('Cannot find many DebugElement with : directive "NoWhereDirective".');
  });

  function validateArrayOfDebugElements(debugs: unknown[]): void {
    validateArray(debugs, { size: 2 });
    debugs.forEach(debug => validateInstanceType(debug, DebugElement));
  }
});
