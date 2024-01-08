import { Component, EventEmitter, Output } from '@angular/core';
import { MyButtonDirective } from '../directives/my-button.directive';

@Component({
  selector: 'app-inner',
  template: `
      <div id="inner-div">
          <button id="my-inner-button" myButton (click)="clicked.emit(true)">Inner Button</button>
      </div>
  `,
  standalone: true,
  imports: [MyButtonDirective],
})
export class InnerComponent {

  @Output()
  public clicked: EventEmitter<boolean> = new EventEmitter();
}
