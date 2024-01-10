import { ComponentFixture, TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { MockTestCompiler } from './test-compiler.mock';

interface TestBedStaticMock extends TestBedStatic {
  _compiler: MockTestCompiler;
}

export function mockTestBedStatic(compiler: MockTestCompiler): TestBedStaticMock {
  return {
    ...TestBed,
    configureTestingModule(moduleDef: TestModuleMetadata): TestBed {
      this._compiler.configureTestingModule(moduleDef);
      return this;
    },
    createComponent<T>(): ComponentFixture<T> {
      return {
        componentInstance: {},
        debugElement: {
          injector: {
            get(): any {
              return null;
            },
          },
        },
      } as any;
    },
    compileComponents(): Promise<any> {
      return Promise.resolve();
    },
    _compiler: compiler,
  } as any;
}
