import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filermsg'
})
export class FilermsgPipe implements PipeTransform {

  transform(value: any): any {
    if (value && value.img !== '') {
      return value;
    } else {
      return null;
    }
  }

}
