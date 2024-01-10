export function assertComponentFixture(fixture: unknown): void {
  if (!fixture)
    throw new Error('ComponentFixture is falsy. You need to use `testBed.compile()` before running expectation.');
}
