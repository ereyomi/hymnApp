import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, ...args: number[]): any {
      /* use in html {{ str | truncate:[20] }} or {{ str | truncate:[20, '...'] }} */
    /* transform(value: string, args: string[]): any {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 150; */
    const limit = args.length > 0 ? args[0] : 150;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
