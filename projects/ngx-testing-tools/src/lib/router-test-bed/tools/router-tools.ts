import { Routes } from '@angular/router';
import { buildBaseTools } from '../../common/tools/base/base-tools';
import { RouterTestBedFactory } from '../router-test-bed-factory';
import { RouterTools } from './models';

export function buildRouterTools<T extends Routes>(factory: RouterTestBedFactory<T>): RouterTools<T> {
  const routes: T = factory['_routes'];
  const harness = factory['_harness'];
  const { injected, injector, rx } = buildBaseTools(factory);

  return { injected, injector, routes, rx, harness };
}
