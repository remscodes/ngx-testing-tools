import { Directive, ElementRef, Host, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective implements OnChanges {

  public constructor(
    @Host() private ref: ElementRef<HTMLElement>,
  ) { }

  @Input('highlight')
  public bgColor: string | undefined = '';

  private defaultColor: string = 'rgb(211, 211, 211)';

  public ngOnChanges(): void {
    this.ref.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
