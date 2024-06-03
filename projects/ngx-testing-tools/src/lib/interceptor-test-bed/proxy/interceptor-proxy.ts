import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { INTERCEPTOR_INFO, InterceptorInfo } from './interceptor-info.token';

@Injectable()
export class InterceptorProxy implements HttpInterceptor {

  private info: InterceptorInfo = inject(INTERCEPTOR_INFO);

  private isRootCtor: boolean = this.info.isRootCtor;

  public instance: any = (this.isRootCtor)
    ? inject(this.info.rootInterceptor)
    : this.info.rootInterceptor;

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return (this.isRootCtor)
      ? (this.instance as HttpInterceptor).intercept(req, next)
      : TestBed.runInInjectionContext(() => (this.instance as HttpInterceptorFn)(req, next.handle));
  }
}
