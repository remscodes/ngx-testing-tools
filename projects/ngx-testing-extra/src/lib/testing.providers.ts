import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders, Provider } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

export function provideTesting(providers: Provider[] = []): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideNoopAnimations(),
    provideHttpClientTesting(),
    importProvidersFrom(RouterTestingModule),
    ...providers,
  ]);
}
