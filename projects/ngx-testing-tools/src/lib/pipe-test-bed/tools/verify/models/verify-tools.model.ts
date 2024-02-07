export interface VerifyTools {
  /**
   * Verifies the expected value with the provided data and parameters transformed by the pipe.
   */
  (spec: VerifySpec): void;

  /**
   * Verifies many expected values for each data and parameters transformed by the pipe.
   */
  many(specs: VerifySpec[]): void;
}

interface VerifySpec {
  /**
   * The expected transformed value.
   */
  expected: any;
  /**
   * The pipe data.
   */
  data: any;
  /**
   * The pipe parameters.
   */
  parameters: any[];
}
