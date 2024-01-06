import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createExtraBed } from 'ngx-testing-extra';
import { Page2Component } from './page-2.component';

fdescribe('Page2Component', () => {
  const bed = createExtraBed(Page2Component);
  beforeEach(() => bed.compile());

  bed.shouldCreate();

  it('should check', bed(({ instance }) => {
    expect(instance.checked).toBeFalse();
    instance.checked = true;
    expect(instance.checked).toBeTrue();
  }));

  it('should check again', bed(({ instance }) => {
    expect(instance.checked).toBeFalse();
    instance.checked = true;
    expect(instance.checked).toBeTrue();
  }));
});

xdescribe('Page2Component', () => {
  let fixture: ComponentFixture<Page2Component>;
  let component: Page2Component;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Page2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check', () => {
    expect(component.checked).toBeFalse();
    component.checked = true;
    expect(component.checked).toBeTrue();
  });

  it('should check again', () => {
    expect(component.checked).toBeFalse();
    component.checked = true;
    expect(component.checked).toBeTrue();
  });
});