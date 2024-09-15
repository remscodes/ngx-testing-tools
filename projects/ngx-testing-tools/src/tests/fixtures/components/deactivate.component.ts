import { Component } from '@angular/core';
import { ComponentCanDeactivate } from '../guards/unload.guard';

@Component({
  selector: 'test-component-can-deactivate',
  template: '',
  standalone: true,
})
export class DeactivateComponent implements ComponentCanDeactivate {

  public formSaved: boolean = false;

  public canDeactivate(): boolean {
    return this.formSaved;
  }
}
