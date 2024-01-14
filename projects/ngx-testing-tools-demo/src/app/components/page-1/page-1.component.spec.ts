import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click } from 'ngx-testing-tools';
import { ButtonDirective, Page1Component } from './page-1.component';

describe('Page1Component', () => {
  let fixture: ComponentFixture<Page1Component>;
  let component: Page1Component;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click button by id', () => {
    expect(component.isClicked).toBeFalse();
    click(fixture, '#my-button');
    expect(component.isClicked).toBeTrue();
  });

  it('should click button by directive', () => {
    expect(component.isClicked).toBeFalse();
    click(fixture, ButtonDirective);
    expect(component.isClicked).toBeTrue();
  });
});
