import { mergeBaseFactory } from '../base/merge-base-factory';
import { RendererTestBedFactory } from './renderer-test-bed-factory';

export function mergeRendererFactory<F extends RendererTestBedFactory<unknown>, TB>(factory: F, tb: TB & F): TB {
  mergeBaseFactory(factory, tb);

  tb.declare = (declarations: any) => {
    factory.declare(declarations);
    return tb;
  };
  return tb;
}
