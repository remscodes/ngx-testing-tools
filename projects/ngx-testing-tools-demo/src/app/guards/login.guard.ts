import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthInfo } from '../services/auth-info.service';

export function loginGuard(): CanActivateFn {
  return () => inject(AuthInfo).isAuthenticated();
}
