import { ComponentFixture } from '@angular/core/testing';
import { findElement } from '../../../../lib/components';
import { InnerComponent } from '../../../fixtures/components/inner.component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../../fixtures/directives/my-button.directive';
import { NoWhereDirective } from '../../../fixtures/directives/no-where.directive';
import { createOuterComponentFixture } from '../../../fixtures/helpers/configuration/create-outer-component-fixture';
import { validateInstanceType } from '../../../fixtures/helpers/validators/validate-instance-type';

describe('findElement', () => {
  let fixture: ComponentFixture<OuterComponent>;
  let component: OuterComponent;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('HTMLButtonElement', () => {

    it('should find button element by selector', () => {
      const button = findElement<HTMLButtonElement>(fixture, '#my-outer-button');
      validateNativeElement(button);
    });

    it('should find button element by directive', () => {
      const button = findElement(fixture, MyButtonDirective);
      validateNativeElement(button);
    });
  });

  describe('Component native element', () => {

    beforeEach(() => {
      component.extraInner = true;
      fixture.detectChanges();
    });

    it('should find InnerComponent element by selector', () => {
      const inner = findElement<HTMLButtonElement>(fixture, 'app-inner');
      validateNativeElement(inner);
    });

    it('should find InnerComponent element by directive', () => {
      const inner = findElement(fixture, InnerComponent);
      validateNativeElement(inner);
    });
  });

  it('should not find element by selector', () => {
    expect(() => findElement(fixture, '#no-where-button'))
      .toThrowError('Cannot find one DebugElement with : selector "#no-where-button".');
  });

  it('should not find element by directive', () => {
    expect(() => findElement(fixture, NoWhereDirective))
      .toThrowError('Cannot find one DebugElement with : directive "NoWhereDirective".');
  });

  function validateNativeElement(element: unknown): void {
    validateInstanceType(element, HTMLElement);
  }
});
