import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appGreaterThZero]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: GreaterThZeroDirective,
      multi: true,
    },
  ],
})
export class GreaterThZeroDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl): { [key: string]: any } | null {
    const money: number = +control.value;
    if (money > 4 && money % 5 == 0) {
      return null;
    }
    return { some: true };
  }
}
