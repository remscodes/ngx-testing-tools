import { inject, Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { routerTestBed } from '../../../lib/router-test-bed';
import { InnerComponent } from '../../fixtures/components/inner.component';
import { OuterComponent } from '../../fixtures/components/outer.component';

@Injectable()
class AuthService {
  public isAuth: boolean = false;
}

const APP_ROUTES: Routes = [
  { path: 'home', component: OuterComponent },
  { path: 'carousel', component: InnerComponent },
  { path: 'account', component: InnerComponent, canActivate: [() => inject(AuthService).isAuth] },
];

describe('routerTestBed', () => {
  const initialUrl = 'home';
  const tb = routerTestBed(APP_ROUTES, { initialUrl })
    .provide(AuthService)
    .inject('auth', AuthService);

  it('should navigate to url', tb(async ({ $url, navigateByUrl }) => {
    expect($url()).toEqual(`/${initialUrl}`);

    await navigateByUrl('carousel');

    expect($url()).toEqual('/carousel');
  }));

  it('should not activate when not authenticated', tb(async ({ $url, navigateByUrl, injected: { auth } }) => {
    expect($url()).toEqual(`/${initialUrl}`);

    await navigateByUrl('account');

    expect($url()).toEqual(`/${initialUrl}`); // guard reject

    auth.isAuth = true;

    await navigateByUrl('account');

    expect($url()).toEqual('/account'); // guard pass
  }));
});
