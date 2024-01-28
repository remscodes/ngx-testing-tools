import { validateInstanceType } from './validate-instance-type';

interface SetExpectations {
  size?: number;
  values?: any[];
}

export function validateSet(set: Set<unknown>, expects: SetExpectations = {}): void {
  const { size, values } = expects;

  validateInstanceType(set, Set);
  if (size !== undefined) expect(set).toHaveSize(size);
  if (values !== undefined) expect([...set.values()]).toEqual(values);
}
