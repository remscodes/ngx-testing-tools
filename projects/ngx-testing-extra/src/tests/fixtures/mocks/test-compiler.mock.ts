import { Provider, Type } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';

export class MockTestCompiler {

  public declarations: Type<any>[] = [];
  public imports: Type<any>[] = [];
  public providers: Provider[] = [];

  public configureTestingModule(moduleDef: TestModuleMetadata): void {
    if (Array.isArray(moduleDef.declarations)) {
      this.declarations.push(...moduleDef.declarations);
    }

    if (Array.isArray(moduleDef.imports)) {
      this.imports.push(...moduleDef.imports);
    }

    if (Array.isArray(moduleDef.providers)) {
      this.providers.push(...moduleDef.providers);
    }
  }
}
