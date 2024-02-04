export interface VerifyTools {
  (spec: VerifyArgs): void;

  many(specs: VerifyArgs[]): void;
}

interface VerifyArgs {
  /**
   * The expected transformed value.
   */
  expected: any;
  data: any;
  parameters: any[];
}
