import { BaseTestBedOptions } from '../../common/test-beds/base/models/base-test-bed-options.model';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';
import { ServiceExtraOptions } from './service-extra-options.model';

export interface ServiceTestBedOptions extends ServiceExtraOptions, HttpOptions, BaseTestBedOptions {}
