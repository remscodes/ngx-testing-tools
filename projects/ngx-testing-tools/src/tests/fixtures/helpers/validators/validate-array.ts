import { validateInstanceType } from './validate-instance-type';

interface ArrayExpectations {
  size?: number;
  equal?: any[];
}

export function validateArray(array: unknown[], expects: ArrayExpectations = {}): void {
  const { size, equal } = expects;

  validateInstanceType(array, Array);
  if (size !== undefined) expect(array).toHaveSize(size);
  if (equal !== undefined) expect(array).toEqual(equal);
}
