import { buildBaseTools } from '../../common/tools/base/base-tools';
import { buildHttpTools } from '../../common/tools/http/http-tools';
import { HttpOptions } from '../../common/tools/http/models/http-options.model';
import { HttpTools } from '../../common/tools/http/models/http-tools.model';
import { GuardTestBedFactory } from '../guard-test-bed-factory';
import { InternalGuardCan } from '../models/guard-can.model';
import { GuardProxy } from '../proxy/guard-proxy';
import { buildChallengeTools } from './challenge/challenge-tools';
import { ChallengeTools } from './challenge/models/challenge-tools.model';
import { GuardTools } from './models';

export function buildGuardTools<T>(factory: GuardTestBedFactory<T>, httpOptions: HttpOptions): GuardTools<T> {
  const guardProxy: GuardProxy = factory['instance'];
  const guardType: InternalGuardCan = factory['type'];
  const guard: T = guardProxy.instance;

  const { injected, injector, rx } = buildBaseTools(factory);
  const http: HttpTools = buildHttpTools(injector, httpOptions);
  const challenge: ChallengeTools<unknown> = buildChallengeTools(guardProxy, injector, guardType);

  return { challenge, guard, http, injected, injector, rx };
}
