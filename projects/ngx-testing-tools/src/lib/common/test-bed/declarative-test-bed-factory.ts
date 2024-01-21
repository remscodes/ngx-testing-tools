import { Type } from '@angular/core';
import { Declaration } from '../../component/test-bed/models/metadata-type.model';
import { MaybeArray } from '../../shared.model';
import { makeArray } from '../../util/array.util';
import { CustomTestBedFactory } from './custom-test-bed-factory';
import { CustomTestBedOptions } from './models/custom-test-bed-options.model';
import { InjectionStore } from './store/models/injected-store.model';

export abstract class DeclarativeTestBedFactory<Instance, Store extends InjectionStore = InjectionStore> extends CustomTestBedFactory<Instance, Store> {

  protected constructor(
    described: Type<Instance>,
    options: CustomTestBedOptions = {},
  ) {
    super(described, options);
  }

  protected declarations: Set<Declaration> = new Set();

  /**
   * Declares one non-standalone component, directive or pipe into the `ComponentTestBed`.
   */
  public declare(declaration: Declaration): this
  /**
   * Declares many non-standalone components, directives and pipes into `ComponentTestBed`.
   */
  public declare(declarations: Declaration[]): this
  public declare(oneOrManyDeclarations: MaybeArray<Declaration>): this {
    makeArray(oneOrManyDeclarations).forEach(v => this.declarations.add(v));
    return this;
  }

  public override async compile(): Promise<void> {
    await super.compile();
    this.testBed.configureTestingModule({
      declarations: [...this.declarations.values()],
    });
  }
}
