import { InjectionToken, Type } from '@angular/core';
import { GuardCan, GuardCanFn } from '../models/guard-can.model';

export interface GuardInfo {
  rootGuard: Type<GuardCan> | GuardCanFn;
  isRootCtor: boolean;
}

export const GUARD_INFO = new InjectionToken<GuardInfo>('ROOT_GUARD_INFO');
