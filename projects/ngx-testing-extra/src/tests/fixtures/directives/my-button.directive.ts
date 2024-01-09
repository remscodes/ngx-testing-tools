import { Directive } from '@angular/core';

@Directive({
  selector: 'button[myButton]',
  standalone: true,
})
export class MyButtonDirective {}
