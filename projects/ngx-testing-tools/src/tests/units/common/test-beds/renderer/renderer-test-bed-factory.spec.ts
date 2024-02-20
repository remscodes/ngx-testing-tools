import { Type } from '@angular/core';
import { RendererTestBedFactory } from '../../../../../lib/common/test-beds/renderer/renderer-test-bed-factory';
import { InnerComponent } from '../../../../fixtures/components/inner.component';
import { NoWhereComponent } from '../../../../fixtures/components/no-where.component';
import { OuterComponent } from '../../../../fixtures/components/outer.component';
import { validateArray } from '../../../../fixtures/helpers/validators/validate-array';
import { mockTestBedStatic } from '../../../../fixtures/mocks/test-bed-static.mock';
import { MockTestCompiler } from '../../../../fixtures/mocks/test-compiler.mock';

class NonAbstractRendererTestBedFactory<T> extends RendererTestBedFactory<T> {
  public constructor(x: Type<T>, h: Type<T>) {
    super(x, h, { autoCompile: false, checkCreate: false });
  }

  protected override deferredTools = () => ({} as any);
}

describe('RendererTestBedFactory', () => {
  let factory: RendererTestBedFactory<OuterComponent>;
  let compiler: MockTestCompiler;

  beforeEach(() => {
    factory = new NonAbstractRendererTestBedFactory(OuterComponent, OuterComponent);
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

  it('should declare one', async () => {
    await factory
      .declare(InnerComponent)
      .compile();

    validateArray(compiler.declarations, { size: 1, equal: [InnerComponent] });
  });

  it('should declare many', async () => {
    await factory
      .declare([InnerComponent, NoWhereComponent])
      .compile();

    validateArray(compiler.declarations, { size: 2, equal: [InnerComponent, NoWhereComponent] });
  });

  it('should not get fixture', () => {
    expect(() => factory['fixture'])
      .toThrow(new ReferenceError('ComponentFixture instance is falsy. You need to set `autoCompile = true` (default) or set `beforeEach(() => tb.compile());` and `autoCompile = false` before running expectations.'));
  });
});
