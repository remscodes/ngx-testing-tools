export function shouldCreate(factory: () => unknown): void {
  globalThis.it('should create', () => {
    expect(factory()).toBeTruthy();
  });
}
