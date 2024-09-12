import { NgModule } from '@angular/core';
import { itShouldCreateModule, moduleTestBed } from '../../../lib';

@NgModule()
class AppModule {
  public foo: boolean = true;
}

describe('itShouldCreateModule', () => {
  itShouldCreateModule(AppModule);
});

describe('moduleTestBed', () => {

  describe('setup', () => {
    const tb = moduleTestBed(AppModule, { checkCreate: false });

    beforeEach(tb.setup(({ module }) => {
      module.foo = false;
    }));

    it('should foo be false', tb(({ module }) => {
      expect(module.foo).toBeFalse();
    }));
  });
});
