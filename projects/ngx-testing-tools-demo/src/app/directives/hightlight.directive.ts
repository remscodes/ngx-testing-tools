import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {

  private elementRef = inject(ElementRef);

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this.highlight('yellow');
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.highlight('');
  }

  private highlight(color: string): void {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }
}
