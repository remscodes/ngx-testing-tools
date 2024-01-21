import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthInfo } from '../services/auth-info.service';

export function loadLazyGuard(): CanMatchFn {
  return () => inject(AuthInfo).isAuthenticated();
}
