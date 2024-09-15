import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ActivateGuard implements CanActivate {

  public constructor(
    private auth: AuthService,
  ) { }

  public canActivate(): boolean {
    return this.auth.isLogin;
  }
}

export const ACTIVATE_GUARD: CanActivateFn = () => inject(AuthService).isLogin;
