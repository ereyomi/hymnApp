import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        return 'Just now';
      }
      const intervals = {
        year: 31536000,
        Month: 2592000,
        week: 604800,
        day:  86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };
      let counter;
      // tslint:disable-next-line:forin
      for (const i in intervals ) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular
          } else {
            return counter + ' ' + i + 's ago'; // plural e.g 2 dsys ago
          }
        }
      }
    }
    return value;
  }

}
