import { BaseTools } from '../../../common/tools/base/models/base-tools.model';
import { HttpTestingTools } from '../../../common/tools/http/models/http-testing-tools.model';
import { RendererTools } from '../../../common/tools/renderer/models/renderer-tools.model';

export interface ComponentTools<T, I extends {} = {}> extends Omit<RendererTools<T>, 'host'>, BaseTools<I>, HttpTestingTools {
  /**
   * The described component instance.
   */
  component: T;
}
