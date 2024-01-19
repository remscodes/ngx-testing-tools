export function shouldCreate(factory: () => unknown): void {
  it('should create', () => {
    const instance: unknown = factory();
    expect(instance).toBeTruthy();
  });
}
