import { throwInstanceError } from '../../../common/error/throw-instance-error';

export function assertModule(module: unknown): void {
  if (!module) throwInstanceError({ name: 'Module instance' });
}
