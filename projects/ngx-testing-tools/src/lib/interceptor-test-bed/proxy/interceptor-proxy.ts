import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Observable } from 'rxjs';
import { INTERCEPTOR_INFO } from './interceptor-info';

@Injectable()
export class InterceptorProxy implements HttpInterceptor {

  private info = inject(INTERCEPTOR_INFO);

  private isRootCtor: boolean = this.info.isRootCtor;

  public instance: any = (this.isRootCtor)
    ? inject(this.info.rootInterceptor)
    : this.info.rootInterceptor;

  /** Set in buildInterceptorTools(...) */
  public injector: Injector = null!;

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRootCtor) return (this.instance as HttpInterceptor).intercept(req, next);

    return runInInjectionContext(this.injector, () => {
      return (this.instance as HttpInterceptorFn)(req, next.handle);
    });
  }
}
