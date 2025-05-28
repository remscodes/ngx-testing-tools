import { MaybeAsync } from '../../../../common/models/maybe-async.model';
import { RouteSnapshotConfig } from '../../../../common/utils/router.util';

export interface TriggerTools<R = MaybeAsync<any>> {
  (): R;

  withInfo(info: RouteSnapshotConfig): R;
}
