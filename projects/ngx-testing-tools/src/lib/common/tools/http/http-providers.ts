import { HttpFeature, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AnyProvider } from '../../test-beds/models/metadata-type.models';

export function httpProviders(...features: HttpFeature<any>[]): AnyProvider[] {
  return [
    provideHttpClient(...features),
    provideHttpClientTesting(),
  ];
}

export const HTTP_PROVIDERS: AnyProvider[] = httpProviders();
