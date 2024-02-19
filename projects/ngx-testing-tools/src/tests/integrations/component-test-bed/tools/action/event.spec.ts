import { ComponentFixture } from '@angular/core/testing';
import { emitEvent } from '../../../../../lib/common/tools/renderer/action/utils/event';
import { OuterComponent } from '../../../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../../../fixtures/directives/my-button.directive';
import { createOuterComponentFixture } from '../../../../fixtures/helpers/configuration/create-outer-component-fixture';

describe('emitEvent', () => {
  let fixture: ComponentFixture<OuterComponent>;
  let component: OuterComponent;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should click on button by selector', () => {
    expect(component.clicked).toBeFalse();
    emitEvent(fixture, '#my-outer-button', 'click');
    expect(component.clicked).toBeTrue();
  });

  it('should click on button by directive', () => {
    expect(component.clicked).toBeFalse();
    emitEvent(fixture, MyButtonDirective, 'click');
    expect(component.clicked).toBeTrue();
  });
});
