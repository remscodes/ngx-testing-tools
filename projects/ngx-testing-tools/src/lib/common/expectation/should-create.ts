export function shouldCreate(factory: () => unknown): void {
  it('should create', () => {
    expect(factory()).toBeTruthy();
  });
}
