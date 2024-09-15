import { Routes } from '@angular/router';
import { routerTestBed } from '../../../lib';
import { InnerComponent } from '../../fixtures/components/inner.component';
import { OuterComponent } from '../../fixtures/components/outer.component';
import { ACTIVATE_GUARD } from '../../fixtures/guards/activate.guard';
import { AuthService } from '../../fixtures/services/auth.service';

const APP_ROUTES: Routes = [
  { path: 'home', component: OuterComponent },
  { path: 'carousel', component: InnerComponent },
  { path: 'account', component: InnerComponent, canActivate: [ACTIVATE_GUARD] },
];

describe('routerTestBed', () => {
  const initialUrl = 'home';
  const tb = routerTestBed(APP_ROUTES, { initialUrl })
    .provide(AuthService)
    .inject('auth', AuthService);

  // it('should initiate another url', tb(({ $url }) => {
  //   expect($url()).toEqual('/another');
  // }, { initialUrl: 'another' }));

  it('should navigate to url', tb(async ({ $url, navigateByUrl }) => {
    expect($url()).toEqual(`/${initialUrl}`);

    await navigateByUrl('carousel');

    expect($url()).toEqual('/carousel');
  }));

  it('should not activate when not authenticated', tb(async ({ $url, navigateByUrl, injected: { auth } }) => {
    expect($url()).toEqual(`/${initialUrl}`);

    await navigateByUrl('account');

    expect($url()).toEqual(`/${initialUrl}`); // expect guard reject so navigation end to current url

    auth.isLogin = true;

    await navigateByUrl('account');

    expect($url()).toEqual('/account'); // expect guard pass
  }));
});
