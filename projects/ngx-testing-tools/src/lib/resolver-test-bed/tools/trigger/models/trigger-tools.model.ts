import { MaybeAsync } from '@angular/router';
import { RouteSnapshotConfig } from '../../../../router/route-snapshot';

export interface TriggerTools<R = MaybeAsync<any>> {
  (): R;

  withInfo(info: RouteSnapshotConfig): R;
}
