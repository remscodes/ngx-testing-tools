export function assertComponentFixture(fixture: unknown): void {
  if (!fixture)
    throw new Error('ComponentFixture is falsy. You need to set componentTestBed options `autoCompile = true` or use `tb.compileEach();` or use `beforeEach(() => tb.compile());` before running expectations.');
}
