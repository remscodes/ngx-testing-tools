import { mergeBaseFactory } from '../base/merge-base-factory';
import { RendererTestBedFactory } from './renderer-test-bed-factory';

export function mergeRendererFactory<T, F extends RendererTestBedFactory<T>>(factory: F, tb: F) {
  mergeBaseFactory(factory, tb);

  tb.declare = (declarations: any) => {
    factory.declare(declarations);
    return tb;
  };
  return tb;
}
