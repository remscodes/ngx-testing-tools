export interface VerifyTools {
  (matcher: VerifyArgs): void;

  many(matchers: VerifyArgs[]): void;
}

interface VerifyArgs {
  /**
   * The expected transformed value.
   */
  expected: any;
  data: any;
  parameters: any[];
}
