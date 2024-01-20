export function assertComponentFixture(fixture: unknown): void {
  if (!fixture)
    throw new Error('ComponentFixture is falsy. You need to use `beforeEach(() => tb.compile());` of `tb.compileEach();` before running expectations.');
}
