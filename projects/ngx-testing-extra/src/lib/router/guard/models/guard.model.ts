import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export type GuardReturn =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree
