import { HttpInterceptor } from '@angular/common/http';
import { InspectTools } from './models/inspect-tools.model';
import { inspectErrorResponse } from './utils/inspect-error-response';
import { inspectRequest } from './utils/inspect-request';
import { inspectSuccessResponse } from './utils/inspect-success-response';

export function buildInspectTools(interceptor: HttpInterceptor): InspectTools {
  return {
    request: (reqOrMethod, url?: string, body?) => inspectRequest(interceptor, reqOrMethod, url, body),
    successResponse: (resOrUrl, body?) => inspectSuccessResponse(interceptor, resOrUrl, body),
    errorResponse: (resOrUrl, error?) => inspectErrorResponse(interceptor, resOrUrl, error),
  };
}
