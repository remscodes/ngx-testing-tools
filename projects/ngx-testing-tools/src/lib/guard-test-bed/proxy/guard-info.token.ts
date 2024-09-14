import { InjectionToken, Type } from '@angular/core';
import { GuardClass, GuardFn } from '../models/guard-can.model';

export interface GuardInfo {
  rootGuard: Type<GuardClass> | GuardFn;
  isRootCtor: boolean;
}

export const GUARD_INFO = new InjectionToken<GuardInfo>('ROOT_GUARD_INFO');
