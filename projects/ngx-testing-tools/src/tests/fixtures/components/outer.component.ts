import { Component, inject } from '@angular/core';
import { MyButtonDirective } from '../directives/my-button.directive';
import { AppService } from '../services/app.service';
import { InnerComponent } from './inner.component';

@Component({
  template: `
      <div id="outer-div">
          <button id="my-outer-button" myButton (click)="clicked = true">Outer Button</button>
          <app-inner (clicked)="innerClicked = $event"/>
          @if (extraInner) {
              <app-inner/>
          }
      </div>
  `,
  standalone: true,
  imports: [InnerComponent, MyButtonDirective],
  providers: [AppService],
})
export class OuterComponent {

  public extraInner: boolean = false;
  public clicked: boolean = false;
  public innerClicked: boolean = false;

  public service = inject(AppService);
}
