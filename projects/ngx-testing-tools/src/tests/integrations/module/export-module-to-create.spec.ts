import { NgModule } from '@angular/core';
import { expectModuleToCreate } from '../../../lib/module';

describe('expectModuleToCreate', () => {
  @NgModule()
  class AppModule {}

  expectModuleToCreate(AppModule);
});
