import { BaseTestBedFactory } from './base-test-bed-factory';

export function mergeBaseFactory<F extends BaseTestBedFactory<unknown>, TB>(factory: F, tb: TB & F): TB {
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
  tb.compile = factory.compile.bind(factory);
  tb.setup = factory.setup.bind(factory);
  tb.shouldCreate = factory.shouldCreate.bind(factory);

  return tb;
}
