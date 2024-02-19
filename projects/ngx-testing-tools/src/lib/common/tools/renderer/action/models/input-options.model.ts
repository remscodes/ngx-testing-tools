import { Type } from '@angular/core';

export interface InputOptions {
  /**
   * @default 'self'
   */
  target: 'self' | string | Type<any> | any;
}
