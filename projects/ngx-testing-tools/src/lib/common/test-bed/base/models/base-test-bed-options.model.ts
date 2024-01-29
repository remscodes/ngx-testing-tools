import { AnyProvider, Importation } from '../../models/metadata-type.model';

export interface BaseTestBedOptions {
  /**
   * Imports many modules or many standalone components / directives / pipes into the custom test bed.
   * @default []
   */
  imports?: Importation[];
  /**
   * Adds many providers into the custom test bed.
   * @default []
   */
  providers?: AnyProvider[];
  /**
   * Automatically compiles the custom test bed for each test.
   * @default true
   */
  autoCompile?: boolean;
  /**
   * Automatically invokes the "should create" test.
   *
   * It checks if the provided `described` instance is truthy.
   * @default true
   */
  checkCreate?: boolean;
}
