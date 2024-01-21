import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthInfo {

  public logged: boolean = false;

  public isAuthenticated(): boolean {
    return this.logged;
  }
}
