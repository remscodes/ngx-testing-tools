import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prefix', standalone: true })
export class PrefixPipe implements PipeTransform {

  public state: boolean = false;

  public transform(value: string, prefix: string, suffix?: string): string {
    return `${prefix}${value}${suffix ?? ''}`;
  }
}
