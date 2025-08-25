import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string | number): string {

    let phoneNumber: string = value.toString().replace(/\D/g, '');;

    if (!value) {
      alert('The phone number in the footer needs reviewing');
      phoneNumber = '0000000000';
    }

    if (phoneNumber.length !== 10) {
      alert('The phone number in the footer needs reviewing');
      phoneNumber = '0000000000';
    };

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  }
}
