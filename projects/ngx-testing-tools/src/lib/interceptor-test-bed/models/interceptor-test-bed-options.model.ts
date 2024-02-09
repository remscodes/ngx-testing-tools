import { BaseTestBedOptions } from '../../common/test-beds/base/models/base-test-bed-options.model';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';

export interface InterceptorTestBedOptions extends Omit<HttpOptions, 'httpTesting'>, BaseTestBedOptions {}
