import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { RendererTools } from '../../../common/tools/renderer/models/renderer-tools.model';

export interface DirectiveTools<T, H, I extends {} = {}> extends RendererTools<H>, BaseTools<I> {
  /**
   * The described directive instance.
   */
  directive: T;
}
