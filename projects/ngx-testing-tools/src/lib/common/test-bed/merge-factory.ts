import { CustomTestBedFactory } from './custom-test-bed-factory';

export function mergeFactoryToTestBed<T, F extends CustomTestBedFactory<T>>(factory: F, tb: F) {
  tb.import = (imports: any) => {
    factory.import(imports);
    return tb;
  };
  tb.provide = (providers: any) => {
    factory.provide(providers);
    return tb;
  };
  tb.inject = (name, token) => {
    factory.inject(name, token);
    return tb;
  };
  tb.compileEach = factory.compileEach.bind(factory);
  tb.setup = factory.setup.bind(factory);
  tb.compile = factory.compile.bind(factory);
  tb.shouldCreate = factory.shouldCreate.bind(factory);

  return tb;
}
