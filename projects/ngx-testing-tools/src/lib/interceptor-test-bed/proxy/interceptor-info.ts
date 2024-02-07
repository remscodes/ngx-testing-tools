import { HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';
import { InjectionToken, Type } from '@angular/core';

export interface InterceptorInfo {
  rootInterceptor: Type<HttpInterceptor> | HttpInterceptorFn;
  isRootCtor: boolean;
}

export const INTERCEPTOR_INFO = new InjectionToken<InterceptorInfo>('ROOT_INTERCEPTOR_INFO');
