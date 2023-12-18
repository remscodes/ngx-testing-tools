import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ModuleWithProviders, NgModule, Provider } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  exports: [
    NoopAnimationsModule,
    HttpClientTestingModule,
    RouterTestingModule,
  ],
})
export class TestingModule {

  public static withExtra(providers: Provider[]): ModuleWithProviders<TestingModule> {
    return { ngModule: TestingModule, providers };
  }
}

