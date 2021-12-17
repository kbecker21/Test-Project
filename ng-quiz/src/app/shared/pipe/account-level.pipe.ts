import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountLevelPipe'
})
export class AccountLevelPipe implements PipeTransform {

  transform(value: any) {
    if (value === 4)
      return 'Tutor';
    if (value === 5)
      return 'Admin';
    return 'Student';
  }

}
