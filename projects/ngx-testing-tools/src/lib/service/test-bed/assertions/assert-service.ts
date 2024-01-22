import { throwInstanceError } from '../../../common/error/throw-instance-error';

export function assertService(service: unknown): void {
  if (!service) throwInstanceError({ name: 'Service instance' });
}
