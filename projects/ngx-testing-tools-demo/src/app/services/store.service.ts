import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable()
export class Store {

  public lastInterceptedError = signal<HttpErrorResponse | null>(null);
}
