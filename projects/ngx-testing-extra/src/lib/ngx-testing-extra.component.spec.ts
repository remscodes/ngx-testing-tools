import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTestingExtraComponent } from './ngx-testing-extra.component';

describe('NgxTestingExtraComponent', () => {
  let component: NgxTestingExtraComponent;
  let fixture: ComponentFixture<NgxTestingExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTestingExtraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxTestingExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
