import { throwInstanceError } from '../../../common/error/throw-instance-error';

export function assertComponentFixture(fixture: unknown): void {
  if (!fixture) throwInstanceError({ name: 'ComponentFixture' });
}
