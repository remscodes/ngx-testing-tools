import { Type } from '@angular/core';
import { Nullable } from '../../shared.model';

type MetadataName =
  | 'Component'
  | 'Directive'
  | 'Injectable'
  | 'NgModule'
  | 'Pipe'

export function getAnnotation<T, A>(AnyCtor: Type<T>, metadataName: MetadataName): Nullable<A> {
  const annotations = (AnyCtor as any)['__annotations__'];
  if (!annotations) return null;

  for (let i = annotations.length - 1; i >= 0; i --) {
    const annotation = annotations[i];
    if (isSameMetadataName(annotation, metadataName)) return annotation;
  }
  return null;
}

function isSameMetadataName(annotation: any, metadataName: MetadataName): boolean {
  return Object.getPrototypeOf(annotation)['ngMetadataName'] === metadataName;
}
