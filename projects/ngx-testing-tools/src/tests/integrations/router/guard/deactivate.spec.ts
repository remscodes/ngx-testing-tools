import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { challengeGuardDeactivate } from '../../../../lib';

describe('challengeGuardDeactivate', () => {
  @Component({ template: ``, standalone: true })
  class DeactivateComponent {
    canDeactivate = true;
  }

  function deactivateGuardFactory(): CanDeactivateFn<DeactivateComponent> {
    return component => component.canDeactivate;
  }

  let component: DeactivateComponent;
  let state: RouterStateSnapshot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeactivateComponent],
    }).compileComponents();

    component = TestBed.createComponent(DeactivateComponent).componentInstance;
    state = TestBed.inject(Router).routerState.snapshot;
  });

  it('should block', () => {
    component.canDeactivate = true;

    const result: boolean = challengeGuardDeactivate(
      deactivateGuardFactory(),
      component,
      state,
      state,
    );

    expect(result).toBeTrue();
  });

  it('should not block', () => {
    component.canDeactivate = false;

    const result: boolean = challengeGuardDeactivate(
      deactivateGuardFactory(),
      component,
      state,
      state,
    );

    expect(result).toBeFalse();
  });
});
