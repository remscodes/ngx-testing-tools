import { Component, Injectable } from '@angular/core';
import { ComponentTestBedFactory } from '../../../../lib/component/test-bed/component-test-bed-factory';
import { InnerComponent } from '../../../fixtures/components/inner.component';
import { NoWhereComponent } from '../../../fixtures/components/no-where.component';
import { OuterComponent } from '../../../fixtures/components/outer.component';
import { validateArray } from '../../../fixtures/helpers/validators/validate-array';
import { mockTestBedStatic } from '../../../fixtures/mocks/test-bed-static.mock';
import { MockTestCompiler } from '../../../fixtures/mocks/test-compiler.mock';

describe('ComponentTestBedFactory', () => {
  let factory: ComponentTestBedFactory<OuterComponent>;
  let compiler: MockTestCompiler;

  beforeEach(() => {
    factory = new ComponentTestBedFactory(OuterComponent, {
      autoCompile: false,
      checkCreate: false,
      noopAnimations: false,
    });
    compiler = new MockTestCompiler();
    factory['testBed'] = mockTestBedStatic(compiler);
  });

  beforeEach(() => {
    validateArray(compiler['imports'], { size: 0 });
    validateArray(compiler['declarations'], { size: 0 });
    validateArray(compiler['providers'], { size: 0 });
  });

  it('should create', () => {
    expect(factory).toBeTruthy();
  });

  it('should configure root component', async () => {
    expect(factory['described']).toEqual(OuterComponent);

    await factory.compile();

    validateArray(compiler.imports, { size: 1, equal: [OuterComponent] });
  });

  it('should import one', async () => {
    await factory
      .import(InnerComponent)
      .compile();

    validateArray(compiler.imports, { size: 2, equal: [OuterComponent, InnerComponent] });
  });

  it('should import many', async () => {
    await factory
      .import([InnerComponent, NoWhereComponent])
      .compile();

    validateArray(compiler.imports, { size: 3, equal: [OuterComponent, InnerComponent, NoWhereComponent] });
  });

  it('should provide one', async () => {
    @Injectable()
    class TestService {}

    await factory
      .provide(TestService)
      .compile();

    validateArray(compiler.providers, { size: 1, equal: [TestService] });
  });

  it('should provide many', async () => {
    @Injectable()
    class TestService1 {}

    @Injectable()
    class TestService2 {}

    await factory
      .provide([TestService1, TestService2])
      .compile();

    validateArray(compiler.providers, { size: 2, equal: [TestService1, TestService2] });
  });

  it('should declare one', async () => {
    @Component({ template: ``, standalone: true })
    class TestComponent {}

    await factory
      .declare(TestComponent)
      .compile();

    validateArray(compiler.declarations, { size: 1, equal: [TestComponent] });
  });

  it('should declare many', async () => {
    @Component({ template: ``, standalone: true })
    class TestComponent1 {}

    @Component({ template: ``, standalone: true })
    class TestComponent2 {}

    await factory
      .declare([TestComponent1, TestComponent2])
      .compile();

    validateArray(compiler.declarations, { size: 2, equal: [TestComponent1, TestComponent2] });
  });

  it('should chain methods', async () => {
    @Component({ template: ``, standalone: true })
    class TestComponent {}

    @Injectable()
    class TestService {}

    await factory
      .import(OuterComponent)
      .declare(TestComponent)
      .provide(TestService)
      .compile();

    validateArray(compiler.declarations, { size: 1, equal: [TestComponent] });
    validateArray(compiler.providers, { size: 1, equal: [TestService] });
    validateArray(compiler.imports, { size: 1, equal: [OuterComponent] });
  });

  describe('should invoke "should create"', () => {
    const bedFactory2 = new ComponentTestBedFactory(OuterComponent, {
      autoCompile: false,
      checkCreate: false,
    });
    bedFactory2['testBed'] = mockTestBedStatic(new MockTestCompiler());

    bedFactory2.compileEach();
    bedFactory2.shouldCreate();
  });
});
