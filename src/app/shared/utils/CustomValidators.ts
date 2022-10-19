import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  /*
    |   Email Validator
    */
  static emailValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const email: string = control.value;

    if (!email) return null;
    else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return null;
    else return { invalid: true };
  }

  /*
    |   Phone Validator
    */
  static phoneValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const phone: string = control.value;

    if (!(phone)) return { required: true };
    else if (/\D/.test(phone)) return { digits: true };
    else if (!/^\d{10}$/.test(phone)) return { length: true };
    else return null;
  }

  /*
    |   Only Number Validator
    */
  static onlyNumberValidator(control: AbstractControl) {
    const phone: string = control.value;

    if (/\D/.test(phone)) return { digits: true };
    else return null;
  }

}
