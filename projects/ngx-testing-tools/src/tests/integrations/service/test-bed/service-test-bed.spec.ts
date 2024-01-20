import { serviceTestBed } from '../../../../lib/service/test-bed';
import { AppService } from '../../../fixtures/services/app.service';

describe('ServiceTestBed', () => {
  const tb = serviceTestBed(AppService)

  tb.compileEach();
  tb.shouldCreate();
});
