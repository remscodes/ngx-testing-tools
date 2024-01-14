import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix',
  standalone: true,
})
export class PrefixPipe implements PipeTransform {

  public transform(value: string, prefix: string): string {
    return `${prefix}${value}`;
  }
}
