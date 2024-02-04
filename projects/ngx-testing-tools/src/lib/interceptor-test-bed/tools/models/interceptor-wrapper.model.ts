import { HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';

export interface InterceptorWrapper<InterceptorType> extends HttpInterceptor {
  isRootCtor: boolean;
  rootInstance: InterceptorType | HttpInterceptorFn;
}
