import { HttpErrorResponse, HttpEventType, HttpHandlerFn, HttpSentEvent } from '@angular/common/http';
import { of, throwError } from 'rxjs';

const mockHttpSent: HttpSentEvent = {
  type: HttpEventType.Sent,
};

export function mockSuccessHandlerFnFactory(): HttpHandlerFn {
  return () => of(mockHttpSent);
}

export function mockErrorHandlerFnFactory(err: HttpErrorResponse): HttpHandlerFn {
  return () => throwError(() => err);
}
