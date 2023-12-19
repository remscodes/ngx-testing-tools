import { Observable } from 'rxjs';

export type ResolveReturn<T> =
  | Observable<T>
  | Promise<T>
  | T;

export type DefaultResolverReturn<T> = Observable<T>;
