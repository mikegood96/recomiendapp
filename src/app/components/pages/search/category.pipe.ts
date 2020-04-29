import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') { return value; }
    const resultLists = [];
    if (arg) {
      for (const list of value) {
        // lo convertimos en minuscula y encontramos la primera ocurrencia
        if (list.tagsList.toLocaleLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultLists.push(list);
        }
      }
    }
    return resultLists;
  }

}
