import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') { return value; }
    const resultLists = [];
    if (arg) {
      for (const list of value) {
        // lo convertimos en minuscula y encontramos la primera ocurrencia
        if (list.titleList.toLocaleLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultLists.push(list);
        }
      }
    }
    return resultLists;
  }

}
