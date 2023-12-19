export interface SuccessInterceptorConfig {
  url: string;
  method?: 'GET' | 'HEAD' | 'DELETE' | 'OPTIONS' | 'JSONP';
}

export interface ErrorInterceptorConfig {
  url?: string;
  status?: number;
}
