import { ComponentFixture } from '@angular/core/testing';
import { emitOutput } from '../../../../../lib';
import { InnerComponent } from '../../../../fixtures/components/inner.component';
import { OuterComponent } from '../../../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../../../fixtures/directives/my-button.directive';
import { createOuterComponentFixture } from '../../../../fixtures/helpers/configuration/create-outer-component-fixture';

describe('emitOutput', () => {
  let fixture: ComponentFixture<OuterComponent>;
  let component: OuterComponent;

  beforeEach(async () => {
    fixture = await createOuterComponentFixture();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit button (click) output by selector', () => {
    expect(component.clicked).toBeFalse();
    emitOutput(fixture, '#my-outer-button', 'click');
    expect(component.clicked).toBeTrue();
  });

  it('should emit button (click) output by directive', () => {
    expect(component.clicked).toBeFalse();
    emitOutput(fixture, MyButtonDirective, 'click');
    expect(component.clicked).toBeTrue();
  });

  it('should emit InnerComponent (clicked) output by selector', () => {
    expect(component.innerClicked).toBeFalse();
    emitOutput(fixture, 'app-inner', 'clicked', true);
    expect(component.innerClicked).toBeTrue();
  });

  it('should emit InnerComponent (clicked) output by directive', () => {
    expect(component.innerClicked).toBeFalse();
    emitOutput(fixture, InnerComponent, 'clicked', true);
    expect(component.innerClicked).toBeTrue();
  });
});
