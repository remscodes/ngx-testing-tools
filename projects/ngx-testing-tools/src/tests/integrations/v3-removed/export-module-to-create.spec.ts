import { NgModule } from '@angular/core';
import { expectModuleToCreate } from '../../../lib';

describe('expectModuleToCreate', () => {
  @NgModule()
  class AppModule {}

  expectModuleToCreate(AppModule);
});
