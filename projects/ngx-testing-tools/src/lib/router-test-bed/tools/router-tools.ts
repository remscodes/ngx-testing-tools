import { Signal, signal, WritableSignal } from '@angular/core';
import { Event, NavigationEnd, Router, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { filter } from 'rxjs';
import { buildBaseTools } from '../../common/tools/base/base-tools';
import { RouterTestBedFactory } from '../router-test-bed-factory';
import { RouterTools } from './models';

export function buildRouterTools<T extends Routes>(factory: RouterTestBedFactory<T>): RouterTools<T> {
  const router: Router = factory['instance'];
  const routes: T = factory['_routes'];
  const harness: RouterTestingHarness = factory['_harness'];

  const { injected, injector, rx } = buildBaseTools(factory);

  const urlSignal: WritableSignal<string> = signal<string>(router.url);

  rx.remind = router.events
    .pipe(filter((event: Event) => (event instanceof NavigationEnd)))
    .subscribe({
      next: (event: Event) => urlSignal.set((event as NavigationEnd).url),
    });

  const $url: Signal<string> = urlSignal.asReadonly();
  const navigateByUrl = harness.navigateByUrl.bind(harness);

  return { $url, harness, injected, injector, navigateByUrl, routes, rx };
}
