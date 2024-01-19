import { ActivatedRouteSnapshot } from '@angular/router';
import { buildRouteSnapshot } from '../../../lib/router/route-snapshot';

describe('buildRouteSnapshot', () => {

  it('should add data into route snapshot', () => {
    const route: ActivatedRouteSnapshot = buildRouteSnapshot({ data: { here: true } });
    expect(route.data['here']).toBeTrue();
  });

  it('should add params into route snapshot', () => {
    const route: ActivatedRouteSnapshot = buildRouteSnapshot({ params: { here: true } });
    expect(route.params['here']).toBeTrue();
  });

  it('should add query params into route snapshot', () => {
    const route: ActivatedRouteSnapshot = buildRouteSnapshot({ queryParams: { here: true } });
    expect(route.queryParams['here']).toBeTrue();
  });
});
