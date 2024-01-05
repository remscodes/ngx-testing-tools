import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraBed, ExtraFn } from 'ngx-testing-extra';
import { Page2Component } from './page-2.component';

const mockWindow = { back: () => {} };

// describeComponent(Page2Component, ({ bed }) => {
//   bed.provide([{ provide: WINDOW, useValue: mockWindow }]);
//
//   bed.compileBeforeEach(({ instance }) => {
//
//     it('should create', () => {
//       expect(instance).toBeTruthy();
//     });
//
//     it('should create', () => {
//       expect(instance.checked).toBeFalse();
//       instance.checked = true;
//       expect(instance.checked).toBeTrue();
//     });
//
//     it('should ', () => {
//       expect(instance.checked).toBeFalse();
//     });
//   });
// });

describe('Page2Component', () => {
  let extra: ExtraFn<Page2Component>;

  beforeEach(async () => {
    extra = await ExtraBed.root(Page2Component).compile();
  });

  it('should create', extra(({ instance }) => {
    expect(instance).toBeTruthy();
    expect(instance.checked).toBeFalse();
    instance.checked = true;
    expect(instance.checked).toBeTrue();
  }, {}));

  it('should ', extra(({ instance }) => {
    expect(instance.checked).toBeFalse();
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
    expect(component.checked).toBeFalse();
    component.checked = true;
    expect(component.checked).toBeTrue();
  });

  it('should ', () => {
    expect(component.checked).toBeFalse();
  });
});
