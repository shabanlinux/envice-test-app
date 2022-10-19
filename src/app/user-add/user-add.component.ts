import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormErrors } from '../shared/utils/FormErrorVar';
import { CustomValidationMessages } from '../shared/utils/ValidationMessage';
import { CustomValidators } from './../shared/utils/CustomValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  public addForm!: FormGroup;

  public formErrors: any = FormErrors;
  public validationMessages: any = CustomValidationMessages.validationMessages;
  public formErrorMsg = "";

  public age: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.initializeForm();

    for (let i = 18; i <= 60; i++) {
      this.age.push(i);
    }
  }

  initializeForm() {
    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.emailValidator]],
      contact: [null, [Validators.required, CustomValidators.phoneValidator]],
      otherContact: [null, [Validators.required, CustomValidators.phoneValidator]],
      empId: [null, [Validators.required, Validators.maxLength(10)]],
      gender: ["Male", [Validators.required]],
      age: [null, [Validators.required, CustomValidators.onlyNumberValidator]],
    });
  }

  submit() {
    if (!this.isFormValid()) return;
    
    const data = {
     ...this.addForm.value,
     age: parseInt(this.addForm.value.age, 10),
    }

    this._userService
      .add(data)
      .subscribe(
        (res: any) => {
          this.sweetAlert({icon: 'success', title: 'YEAH!!!', text: 'Account Created Successfully'});
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
          
        },
        err => {
          this.sweetAlert({icon: 'error', title: 'OOPS!!!', text: err.message});
        }
      );
  }

  sweetAlert(data: any) {
    Swal.fire({
      icon: data.icon,
      title: data.title,
      text: data.text,
    });
  }

  isFormValid() {
    this.addForm.markAllAsTouched();
    this.logValidationErrors();

    if (this.addForm.invalid) this.sweetAlert({icon: 'error', title: 'OOPS!!!', text: 'Form is not valid'});
    return this.addForm.valid;
  }

  logValidationErrors(group: FormGroup = this.addForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = "";
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const msg = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) this.formErrors[key] = msg[errorKey] + " ";
        }
      }

      if (abstractControl instanceof FormGroup)
        this.logValidationErrors(abstractControl);
    });
  }

}
