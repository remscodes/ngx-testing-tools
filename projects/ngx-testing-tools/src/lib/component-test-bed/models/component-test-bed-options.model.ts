import { RendererTestBedOptions } from '../../common/test-beds/renderer/models/renderer-test-bed-options.model';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';

export interface ComponentTestBedOptions extends HttpOptions, RendererTestBedOptions {}
