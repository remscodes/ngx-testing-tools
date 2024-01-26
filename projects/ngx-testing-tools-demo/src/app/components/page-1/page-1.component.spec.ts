import { ComponentFixture, TestBed } from '@angular/core/testing';
import { componentTestBed } from 'ngx-testing-tools';
import { ButtonDirective, Page1Component } from './page-1.component';

describe('Page1Component', () => {
  let fixture: ComponentFixture<Page1Component>;
  let component: Page1Component;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Page1Component],
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(Page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Page1Component', () => {
  const tb = componentTestBed(Page1Component);

  tb.compileEach();
  tb.shouldCreate();

  it('should click button by directive', tb(({ component, action }) => {
    expect(component.isClicked).toBeFalse();
    action.click(ButtonDirective);
    expect(component.isClicked).toBeTrue();
  }));
});
