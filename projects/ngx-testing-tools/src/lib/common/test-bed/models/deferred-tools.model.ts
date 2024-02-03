import { Deferred } from '../../../shared.model';
import { BaseTools } from '../base/models/base-tools.model';

export type DeferredTools<T extends BaseTools = BaseTools> = Deferred<T>
