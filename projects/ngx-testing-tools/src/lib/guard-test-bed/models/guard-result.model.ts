import { RedirectCommand, UrlTree } from '@angular/router';

export type GuardResult = boolean | UrlTree | RedirectCommand;
