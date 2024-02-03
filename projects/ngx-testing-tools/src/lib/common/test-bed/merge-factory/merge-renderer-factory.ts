import { RendererTestBedFactory } from '../renderer/renderer-test-bed-factory';
import { mergeBaseFactory } from './merge-base-factory';

export function mergeRendererFactory<T, F extends RendererTestBedFactory<T>>(factory: F, tb: F) {
  mergeBaseFactory(factory, tb);

  tb.declare = (declarations: any) => {
    factory.declare(declarations);
    return tb;
  };
  return tb;
}
