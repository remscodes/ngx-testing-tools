import { TestModuleMetadata } from '@angular/core/testing';
import { AnyProvider, Declaration, Importation } from '../../../lib/common/test-beds/models/metadata-type.models';

export class MockTestCompiler {

  public declarations: Declaration[] = [];
  public imports: Importation[] = [];
  public providers: AnyProvider[] = [];

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
