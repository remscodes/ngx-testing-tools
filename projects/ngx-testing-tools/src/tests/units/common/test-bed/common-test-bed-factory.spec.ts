import { Type } from '@angular/core';
import { CustomTestBedFactory } from '../../../../lib/common/test-bed/custom-test-bed-factory';
import { EnhancedJasmineCallback } from '../../../../lib/common/test-bed/models/enhanced-jasmine-callback.model';
import { InnerComponent } from '../../../fixtures/components/inner.component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { MyButtonDirective } from '../../../fixtures/directives/my-button.directive';
import { validateArray } from '../../../fixtures/helpers/validators/validate-array';
import { validateMap } from '../../../fixtures/helpers/validators/validate-map';
import { mockTestBedStatic } from '../../../fixtures/mocks/test-bed-static.mock';
import { MockTestCompiler } from '../../../fixtures/mocks/test-compiler.mock';
import { AppService } from '../../../fixtures/services/app.service';

class NonAbstractCommonTestBedFactory<T> extends CustomTestBedFactory<T> {
  public constructor(x: Type<any>) {super(x);}

  public override setup<Action extends EnhancedJasmineCallback<any>>(action: Action): jasmine.ImplementationCallback {
    throw new Error('Method not implemented.');
  }

  public override shouldCreate(): void {
    throw new Error('Method not implemented.');
  }
}

describe('CommonTestBedFactory', () => {
  let factory: CustomTestBedFactory<OuterComponent>;
  let compiler: MockTestCompiler;

  beforeEach(() => {
    factory = new NonAbstractCommonTestBedFactory(OuterComponent);
    compiler = new MockTestCompiler();
    factory['testBed'] = mockTestBedStatic(compiler);
  });

  beforeEach(() => {
    validateArray(compiler.declarations, { size: 0 });
    validateArray(compiler.imports, { size: 0 });
    validateArray(compiler.providers, { size: 0 });
  });

  it('should create', () => {
    expect(factory).toBeTruthy();
  });

  it('should import one', async () => {
    await factory
      .import(InnerComponent)
      .compile();

    validateArray(compiler.imports, { size: 1, equal: [InnerComponent] });
  });

  it('should import many', async () => {
    await factory
      .import([InnerComponent, MyButtonDirective])
      .compile();

    validateArray(compiler.imports, { size: 2, equal: [InnerComponent, MyButtonDirective] });
  });

  it('should provide one', async () => {
    await factory
      .provide(AppService)
      .compile();

    validateArray(compiler.providers, { size: 1, equal: [AppService] });
  });

  it('should provide many', async () => {
    await factory
      .provide([AppService, { provide: 'A', useValue: 1 }])
      .compile();

    validateArray(compiler.providers, { size: 2, equal: [AppService, { provide: 'A', useValue: 1 }] });
  });

  it('should inject', () => {
    factory
      .provide(AppService)
      .inject('service', AppService);

    validateMap(factory['injectedMap'], { size: 1, entries: { service: AppService } });
  });
});
