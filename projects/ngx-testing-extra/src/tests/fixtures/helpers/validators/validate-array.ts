import { validateInstanceType } from './validate-instance-type';

export function validateArray(array: unknown[], expectedSize?: number): void {
  validateInstanceType(array, Array);
  if (expectedSize !== undefined) expect(array.length).toEqual(expectedSize);
}
