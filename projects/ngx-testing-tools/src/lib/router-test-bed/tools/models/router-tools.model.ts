import { Signal } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { BaseTools } from '../../../common/tools/base/models/base-tools.model';

export interface RouterTools<T extends Routes, I extends {} = {}> extends BaseTools<I> {
  /**
   * The described routes.
   */
  routes: T;
  /**
   * @see RouterTestingHarness
   */
  harness: RouterTestingHarness;
  /**
   * @see RouterTestingHarness.navigateByUrl
   */
  navigateByUrl: RouterTestingHarness['navigateByUrl'];
  /**
   * The current url as a Signal.
   */
  $url: Signal<string>;
}
