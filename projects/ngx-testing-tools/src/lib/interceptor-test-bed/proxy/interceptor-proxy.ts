import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { INTERCEPTOR_INFO } from './interceptor-info';

@Injectable()
export class InterceptorProxy implements HttpInterceptor {

  private info = inject(INTERCEPTOR_INFO);

  private isRootCtor: boolean = this.info.isRootCtor;

  public instance: any = (this.isRootCtor)
    ? inject(this.info.rootInterceptor)
    : this.info.rootInterceptor;

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRootCtor) return (this.instance as HttpInterceptor).intercept(req, next);

    return TestBed.runInInjectionContext(() => {
      return (this.instance as HttpInterceptorFn)(req, next.handle);
    });
  }
}
