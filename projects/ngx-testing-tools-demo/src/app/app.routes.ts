import { Routes } from '@angular/router';
import { Page1Component } from './components/page-1/page-1.component';
import { Page2Component } from './components/page-2/page-2.component';
import { loadLazyGuard } from './guards/load-lazy.guard';
import { loginGuard } from './guards/login.guard';
import { noBackGuard } from './guards/no-back.guard';

export const APP_ROUTES: Routes = [
  {
    path: '1',
    canActivate: [loginGuard()],
    canDeactivate: [noBackGuard<Page1Component>()],
    component: Page1Component,
  },
  {
    path: '2',
    canMatch: [loadLazyGuard()],
    component: Page2Component,
  },
];
