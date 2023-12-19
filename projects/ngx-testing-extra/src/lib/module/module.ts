import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestingModule } from '../testing.module';

export function expectModuleToInitialize<T>(Module: Type<T>): void {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Module, TestingModule] });
  });

  it('should initialize', () => {
    const module: T = TestBed.inject(Module);
    expect(module).toBeTruthy();
  });
}
