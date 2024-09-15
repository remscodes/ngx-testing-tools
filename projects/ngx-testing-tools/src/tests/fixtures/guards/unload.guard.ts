import { Injectable } from '@angular/core';
import { CanDeactivate, CanDeactivateFn } from '@angular/router';

export interface ComponentCanDeactivate {
  canDeactivate(): boolean;
}

@Injectable()
export class UnloadGuard implements CanDeactivate<ComponentCanDeactivate> {

  public canDeactivate(component: Partial<ComponentCanDeactivate>): boolean {
    return component?.canDeactivate?.() ?? true;
  }
}

export const UNLOAD_GUARD: CanDeactivateFn<ComponentCanDeactivate> = (component: Partial<ComponentCanDeactivate>) => component?.canDeactivate?.() ?? true;
