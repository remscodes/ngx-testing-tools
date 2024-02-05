import { HttpInterceptor } from '@angular/common/http';

export interface InterceptorWrapper<T> extends HttpInterceptor {
  isRootCtor: boolean;
  rootInstance: T;
}
