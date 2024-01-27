import { SchemaMetadata } from '@angular/core';
import { BaseTestBedOptions } from '../../base/models/base-test-bed-options.model';
import { Declaration } from '../../models/metadata-type.model';

export interface RendererTestBedOptions extends BaseTestBedOptions {
  /**
   * @default []
   */
  declarations?: Declaration[],
  /**
   * The schema definitions.
   * @default []
   * @see {@link CUSTOM_ELEMENTS_SCHEMA}
   * @see {@link NO_ERRORS_SCHEMA}
   */
  schemas?: SchemaMetadata[];
  /**
   * Disables Angular animations with `provideNoopAnimations()`.
   * @default true
   */
  noopAnimations?: boolean;
  /**
   * Imports (standalone) or declares (non-standalone) the described into the custom test bed.
   * @default true
   */
  ingestDescribed?: boolean;
}
