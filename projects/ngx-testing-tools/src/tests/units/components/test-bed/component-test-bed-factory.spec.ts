import { Component, Injectable } from '@angular/core';
import { ComponentTestBedFactory } from '../../../../lib/components/test-bed/component-test-bed-factory';
import { InnerComponent } from '../../../fixtures/components/inner.component';
import { NoWhereComponent } from '../../../fixtures/components/no-where.component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { validateArray } from '../../../fixtures/helpers/validators/validate-array';
import { mockTestBedStatic } from '../../../fixtures/mocks/test-bed-static.mock';
import { MockTestCompiler } from '../../../fixtures/mocks/test-compiler.mock';

describe('ComponentTestBedFactory', () => {
  let bedFactory: ComponentTestBedFactory<OuterComponent, {}>;
  let compiler: MockTestCompiler;

  beforeEach(() => {
    bedFactory = new ComponentTestBedFactory(OuterComponent);
    compiler = new MockTestCompiler();
    bedFactory['testBed'] = mockTestBedStatic(compiler);
  });

  beforeEach(() => {
    validateArray(compiler.imports, { size: 0 });
    validateArray(compiler.providers, { size: 0 });
    validateArray(compiler.declarations, { size: 0 });
  });

  it('should configure root component', async () => {
    expect(bedFactory['rootComponent']).toEqual(OuterComponent);

    await bedFactory.compile();

    validateArray(compiler.imports, { size: 1, equal: [OuterComponent] });
  });

  it('should import one', () => {
    bedFactory.import(InnerComponent);

    validateArray(compiler.imports, { size: 1, equal: [InnerComponent] });
  });

  it('should import many', () => {
    bedFactory.import([InnerComponent, NoWhereComponent]);

    validateArray(compiler.imports, { size: 2, equal: [InnerComponent, NoWhereComponent] });
  });

  it('should provide one', () => {
    @Injectable()
    class TestService {}

    bedFactory.provide(TestService);

    validateArray(compiler.providers, { size: 1, equal: [TestService] });
  });

  it('should provide many', () => {
    @Injectable()
    class TestService1 {}

    @Injectable()
    class TestService2 {}

    bedFactory.provide([TestService1, TestService2]);

    validateArray(compiler.providers, { size: 2, equal: [TestService1, TestService2] });
  });

  it('should declare one', () => {
    @Component({ template: `` })
    class TestComponent {}

    bedFactory.declare(TestComponent);

    validateArray(compiler.declarations, { size: 1, equal: [TestComponent] });
  });

  it('should declare many', () => {
    @Component({ template: `` })
    class TestComponent1 {}

    @Component({ template: `` })
    class TestComponent2 {}

    bedFactory.declare([TestComponent1, TestComponent2]);

    validateArray(compiler.declarations, { size: 2, equal: [TestComponent1, TestComponent2] });
  });

  it('should chain methods', () => {
    @Component({ template: `` })
    class TestComponent {}

    @Injectable()
    class TestService {}

    bedFactory
      .import(OuterComponent)
      .declare(TestComponent)
      .provide(TestService);

    validateArray(compiler.declarations, { size: 1, equal: [TestComponent] });
    validateArray(compiler.providers, { size: 1, equal: [TestService] });
    validateArray(compiler.imports, { size: 1, equal: [OuterComponent] });
  });

  describe('should invoke "should create"', () => {
    const bedFactory2 = new ComponentTestBedFactory(OuterComponent);
    bedFactory2['testBed'] = mockTestBedStatic(new MockTestCompiler());

    beforeAll(() => bedFactory2.compile());

    bedFactory2.shouldCreate();
  });
});
