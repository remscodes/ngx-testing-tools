import { ServiceTestBedFactory } from '../../../lib/service-test-bed/service-test-bed-factory';
import { validateArray } from '../../fixtures/helpers/validators/validate-array';
import { mockTestBedStatic } from '../../fixtures/mocks/test-bed-static.mock';
import { MockTestCompiler } from '../../fixtures/mocks/test-compiler.mock';
import { AppService } from '../../fixtures/services/app.service';

describe('ServiceTestBedFactory', () => {
  let factory: ServiceTestBedFactory<AppService>;
  let compiler: MockTestCompiler;

  beforeEach(() => {
    factory = new ServiceTestBedFactory(AppService, {
      autoCompile: false,
      checkCreate: false,
    });
    compiler = new MockTestCompiler();
    factory['testBed'] = mockTestBedStatic(compiler);
  });

  beforeEach(() => {
    validateArray(compiler.imports, { size: 0 });
    validateArray(compiler.providers, { size: 0 });
  });

  it('should create', () => {
    expect(factory).toBeTruthy();
  });
});

describe('ServiceTestBedFactory default options', () => {
  new ServiceTestBedFactory(AppService);
});
