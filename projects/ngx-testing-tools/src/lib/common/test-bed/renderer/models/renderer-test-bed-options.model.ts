import { SchemaMetadata } from '@angular/core';
import { BaseTestBedOptions } from '../../base/models/base-test-bed-options.model';

export interface RendererTestBedOptions extends BaseTestBedOptions {
  /**
   * The schema definitions.
   * @default []
   * @see {@link CUSTOM_ELEMENTS_SCHEMA}
   * @see {@link NO_ERRORS_SCHEMA}
   */
  schemas?: SchemaMetadata[];
  /**
   * Disable Angular animations.
   * @default true
   */
  noopAnimations?: boolean;
}
