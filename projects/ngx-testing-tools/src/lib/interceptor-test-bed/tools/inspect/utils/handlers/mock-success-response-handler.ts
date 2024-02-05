import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export function mockSuccessResponseHandlerFactory(res: HttpResponse<unknown>): any {
  return { handle: () => of(res) };
}
