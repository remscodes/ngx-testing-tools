import { Directive, ElementRef, Input, OnChanges, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective implements OnChanges {

  public constructor(
    private ref: ElementRef<HTMLElement>,
    private container: ViewContainerRef,
  ) { }

  @Input('highlight')
  public bgColor: string | undefined = '';

  private defaultColor: string = 'rgb(211, 211, 211)';

  public ngOnChanges(): void {
    this.ref.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
