import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findAllComponents, findComponent } from '../../../lib/components';
import { InnerComponent } from '../../fixtures/components/inner.component';
import { NoWhereComponent } from '../../fixtures/components/no-where.component';
import { OuterComponent } from '../../fixtures/components/outer.component';

describe('Element finding utils', () => {
  let fixture: ComponentFixture<OuterComponent>;
  let component: OuterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OuterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OuterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('findComponent', () => {

    it('should find InnerComponent by directive', () => {
      const inner = findComponent(fixture, InnerComponent);

      expect(inner).toBeTruthy();
    });

    it('should find InnerComponent by selector', () => {
      const inner = findComponent(fixture, 'app-inner');

      expect(inner).toBeTruthy();
    });

    it('should not find one by directive', () => {
      expect(() => findComponent(fixture, NoWhereComponent))
        .toThrowError('Cannot find one DebugElement with : directive "NoWhereComponent"');
    });

    it('should not find one by selector', () => {
      expect(() => findComponent(fixture, 'app-no-where'))
        .toThrowError('Cannot find one DebugElement with : selector "app-no-where"');
    });
  });

  describe('findAllComponents', () => {

    beforeEach(() => {
      component.extraInner = true;
      fixture.detectChanges();
    });

    it('should find all InnerComponent by directive', () => {
      const inners = findAllComponents<InnerComponent>(fixture, InnerComponent);

      expect(inners).toBeTruthy();
      expect(Array.isArray(inners)).toBeTrue();
      expect(inners.length).toEqual(2);
    });

    it('should find all InnerComponent by selector', () => {
      const inners = findAllComponents<InnerComponent>(fixture, 'app-inner');

      expect(inners).toBeTruthy();
      expect(Array.isArray(inners)).toBeTrue();
      expect(inners.length).toEqual(2);
    });

    it('should not find many by directive', () => {
      expect(() => findAllComponents(fixture, NoWhereComponent))
        .toThrowError('Cannot find many DebugElement with : directive "NoWhereComponent"');
    });

    it('should not find many by selector', () => {
      expect(() => findAllComponents(fixture, 'app-no-where'))
        .toThrowError('Cannot find many DebugElement with : selector "app-no-where"');
    });
  });
});
