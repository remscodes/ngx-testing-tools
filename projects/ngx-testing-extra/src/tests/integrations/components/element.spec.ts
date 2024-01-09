import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findAllComponents, findAllDebugElements, findAllElements, findComponent, findDebugElement, findElement } from '../../../lib/components';
import { InnerComponent } from '../../fixtures/components/inner.component';
import { NoWhereComponent } from '../../fixtures/components/no-where.component';
import { OuterComponent } from '../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../fixtures/directives/my-button.directive';
import { NoWhereDirective } from '../../fixtures/directives/no-where.directive';

describe('Element finding utils', () => {
  let fixture: ComponentFixture<OuterComponent>;
  let component: OuterComponent;

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({ imports: [OuterComponent] })
      .compileComponents();

    fixture = TestBed.createComponent(OuterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function validateInstanceType<T extends Function>(instance: unknown, InstanceCtor: T): void {
    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(InstanceCtor);
  }

  function validateArrayOf2(array: unknown[]): void {
    validateInstanceType(array, Array);
    expect(array.length).toEqual(2);
  }

  describe('findDebugElement', () => {

    function validateDebugElement(debug: unknown): void {
      validateInstanceType(debug, DebugElement);
    }

    it('should find InnerComponent debug element by selector', () => {
      const debug = findDebugElement(fixture, 'app-inner');
      validateDebugElement(debug);
    });

    it('should find InnerComponent debug element by directive', () => {
      const debug = findDebugElement(fixture, InnerComponent);
      validateDebugElement(debug);
    });

    it('should find button debug element by selector', () => {
      const debug = findDebugElement(fixture, '#my-outer-button');
      validateDebugElement(debug);
    });

    it('should find button debug element by directive', () => {
      const debug = findDebugElement(fixture, MyButtonDirective);
      validateDebugElement(debug);
    });

    it('should not find one by selector', () => {
      expect(() => findDebugElement(fixture, '#no-where-button'))
        .toThrowError('Cannot find one DebugElement with : selector "#no-where-button"');
    });

    it('should not find one by directive', () => {
      expect(() => findDebugElement(fixture, NoWhereDirective))
        .toThrowError('Cannot find one DebugElement with : directive "NoWhereDirective"');
    });
  });

  describe('findAllDebugElements', () => {

    function validateArrayOfDebugElements(debugs: unknown[]): void {
      validateArrayOf2(debugs);
      debugs.forEach(debug => validateInstanceType(debug, DebugElement));
    }

    describe('InnerComponent', () => {

      beforeEach(() => {
        component.extraInner = true;
        fixture.detectChanges();
      });

      it('should find all InnerComponent debug elements by selector', () => {
        const debugs = findAllDebugElements(fixture, 'app-inner');
        validateArrayOfDebugElements(debugs);
      });

      it('should find all InnerComponent debug elements by directive', () => {
        const debugs = findAllDebugElements(fixture, InnerComponent);
        validateArrayOfDebugElements(debugs);
      });
    });

    describe('HTMLButtonElement', () => {

      it('should not find all button debug elements by selector', () => {
        const debugs = findAllDebugElements(fixture, 'button');
        validateArrayOfDebugElements(debugs);
      });

      it('should not find all button debug element by directive', () => {
        const debugs = findAllDebugElements(fixture, MyButtonDirective);
        validateArrayOfDebugElements(debugs);
      });
    });

    it('should not find all debug elements by selector', () => {
      expect(() => findAllDebugElements(fixture, 'app-no-where'))
        .toThrowError('Cannot find many DebugElement with : selector "app-no-where"');
    });

    it('should not find all debug elements by directive', () => {
      expect(() => findAllDebugElements(fixture, NoWhereDirective))
        .toThrowError('Cannot find many DebugElement with : directive "NoWhereDirective"');
    });
  });

  describe('findComponent', () => {

    function validateComponentInstance(component: unknown): void {
      validateInstanceType(component, InnerComponent);
    }

    it('should find InnerComponent instance by selector', () => {
      const inner = findComponent<InnerComponent>(fixture, 'app-inner');
      validateComponentInstance(inner);
    });

    it('should find InnerComponent instance by directive', () => {
      const inner = findComponent(fixture, InnerComponent);
      validateComponentInstance(inner);
    });

    it('should not find component instance by selector', () => {
      expect(() => findComponent<NoWhereComponent>(fixture, 'app-no-where'))
        .toThrowError('Cannot find one DebugElement with : selector "app-no-where"');
    });

    it('should not find component instance by directive', () => {
      expect(() => findComponent(fixture, NoWhereComponent))
        .toThrowError('Cannot find one DebugElement with : directive "NoWhereComponent"');
    });
  });

  describe('findAllComponents', () => {

    beforeEach(() => {
      component.extraInner = true;
      fixture.detectChanges();
    });

    function validateArrayOfComponentInstances(inners: unknown[]): void {
      validateArrayOf2(inners);
      inners.forEach(inner => validateInstanceType(inner, InnerComponent));
    }

    it('should find all InnerComponent instances by selector', () => {
      const inners = findAllComponents<InnerComponent>(fixture, 'app-inner');
      validateArrayOfComponentInstances(inners);
    });

    it('should find all InnerComponent instances by directive', () => {
      const inners = findAllComponents<InnerComponent>(fixture, InnerComponent);
      validateArrayOfComponentInstances(inners);
    });

    it('should not find all component instances by selector', () => {
      expect(() => findAllComponents(fixture, 'app-no-where'))
        .toThrowError('Cannot find many DebugElement with : selector "app-no-where"');
    });

    it('should not find all component instances by directive', () => {
      expect(() => findAllComponents(fixture, NoWhereComponent))
        .toThrowError('Cannot find many DebugElement with : directive "NoWhereComponent"');
    });
  });

  describe('findElement', () => {

    function validateNativeElement(element: unknown): void {
      validateInstanceType(element, HTMLElement);
    }

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
        .toThrowError('Cannot find one DebugElement with : selector "#no-where-button"');
    });

    it('should not find element by directive', () => {
      expect(() => findElement(fixture, NoWhereDirective))
        .toThrowError('Cannot find one DebugElement with : directive "NoWhereDirective"');
    });
  });

  describe('findAllElements', () => {

    function validateArrayOfNativeElements(elements: unknown[]): void {
      validateArrayOf2(elements);
      elements.forEach(element => validateInstanceType(element, HTMLElement));
    }

    describe('HTMLButtonElement', () => {

      it('should find all buttons by selector', () => {
        const buttons = findAllElements<HTMLButtonElement>(fixture, 'button');
        validateArrayOfNativeElements(buttons);
      });

      it('should find all buttons by directive', () => {
        const buttons = findAllElements<HTMLButtonElement>(fixture, MyButtonDirective);
        validateArrayOfNativeElements(buttons);
      });
    });

    describe('Component native element', () => {

      beforeEach(() => {
        component.extraInner = true;
        fixture.detectChanges();
      });

      it('should find all InnerComponent elements by selector', () => {
        const inners = findAllElements(fixture, 'app-inner');
        validateArrayOfNativeElements(inners);
      });

      it('should find all InnerComponent elements by directive', () => {
        const inners = findAllElements(fixture, InnerComponent);
        validateArrayOfNativeElements(inners);
      });
    });

    it('should not find all by selector', () => {
      expect(() => findAllElements(fixture, 'app-no-where'))
        .toThrowError('Cannot find many DebugElement with : selector "app-no-where"');
    });

    it('should not find all by directive', () => {
      expect(() => findAllElements(fixture, NoWhereDirective))
        .toThrowError('Cannot find many DebugElement with : directive "NoWhereDirective"');
    });
  });
});
