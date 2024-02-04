import { Deferred } from '../../shared.models';
import { BaseTools } from '../base/models/base-tools.model';

export type DeferredTools<T extends BaseTools = BaseTools> = Deferred<T>
