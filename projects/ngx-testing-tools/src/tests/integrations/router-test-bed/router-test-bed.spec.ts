import { Routes } from '@angular/router';
import { routerTestBed } from '../../../lib/router-test-bed';
import { InnerComponent } from '../../fixtures/components/inner.component';
import { OuterComponent } from '../../fixtures/components/outer.component';

const ROUTES: Routes = [
  { path: 'home', component: OuterComponent },
  { path: 'account', component: InnerComponent },
];

describe('routerTestBed', () => {
  const initialUrl = 'home';
  const tb = routerTestBed(ROUTES, { initialUrl });

  it('should navigate to url', tb(async ({ navigateByUrl, $url }) => {
    expect($url()).toEqual(`/${initialUrl}`);

    await navigateByUrl('account');

    expect($url()).toEqual('/account');
  }));
});
