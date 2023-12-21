import { Routes } from '@angular/router';
import { Page1Component } from './components/page-1/page-1.component';
import { Page2Component } from './components/page-2/page-2.component';

export const APP_ROUTES: Routes = [
  {
    path: '1',
    component: Page1Component,
  },
  {
    path: '2',
    component: Page2Component,
  },
];
