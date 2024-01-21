import { ComponentFixture } from '@angular/core/testing';
import { click } from '../../../../lib/component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../../fixtures/directives/my-button.directive';
import { createOuterComponentFixture } from '../../../fixtures/helpers/configuration/create-outer-component-fixture';

describe('click', () => {
  let fixture: ComponentFixture<OuterComponent>;
  let component: OuterComponent;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should click on button by selector', () => {
    expect(component.clicked).toBeFalse();
    click(fixture, '#my-outer-button');
    expect(component.clicked).toBeTrue();
  });

  it('should click on button by directive', () => {
    expect(component.clicked).toBeFalse();
    click(fixture, MyButtonDirective);
    expect(component.clicked).toBeTrue();
  });
});
