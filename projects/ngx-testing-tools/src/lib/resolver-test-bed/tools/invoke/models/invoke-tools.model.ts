import { MaybeAsync } from '@angular/router';
import { RouteSnapshotConfig } from '../../../../router/route-snapshot';

export interface InvokeTools<R = MaybeAsync<any>> {
  (): R;

  withInfo(info: RouteSnapshotConfig): R;
}
