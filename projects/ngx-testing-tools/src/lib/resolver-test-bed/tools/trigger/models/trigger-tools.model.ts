import { MaybeAsync } from '@angular/router';
import { RouteSnapshotConfig } from '../../../../common/utils/router.util';

export interface TriggerTools<R = MaybeAsync<any>> {
  (): R;

  withInfo(info: RouteSnapshotConfig): R;
}
