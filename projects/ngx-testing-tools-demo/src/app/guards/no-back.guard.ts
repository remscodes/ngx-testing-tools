import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { AuthInfo } from '../services/auth-info.service';

export function noBackGuard<T>(): CanDeactivateFn<T> {
  return () => !inject(AuthInfo).isAuthenticated();
}
