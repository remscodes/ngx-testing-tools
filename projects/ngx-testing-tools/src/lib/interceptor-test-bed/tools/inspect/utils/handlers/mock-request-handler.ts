import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

export function mockRequestHandlerFactory(): any {
  return { handle: (req: HttpRequest<unknown>) => of(req) };
}
