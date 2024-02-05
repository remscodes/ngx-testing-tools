import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function mockErrorResponseHandlerFactory(res: HttpErrorResponse): any {
  return { handle: () => throwError(() => res) };
}
