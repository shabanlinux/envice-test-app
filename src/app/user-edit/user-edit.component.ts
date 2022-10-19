import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { CustomValidators } from '../shared/utils/CustomValidators';
import { FormErrors } from '../shared/utils/FormErrorVar';
import { CustomValidationMessages } from '../shared/utils/ValidationMessage';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public editForm!: FormGroup;

  public formErrors: any = FormErrors;
  public validationMessages: any = CustomValidationMessages.validationMessages;
  public formErrorMsg = "";

  public age: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.initializeForm();

    for (let i = 18; i <= 60; i++) {
      this.age.push(i);
    }

    this.activatedRoute
      .params
      .subscribe(
        (res: any) => {
          console.log(res);
          this.getUser(res.contact);
        }
      );
  }

  initializeForm() {
    this.editForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.emailValidator]],
      contact: [null, [Validators.required, CustomValidators.phoneValidator]],
      otherContact: [null, [Validators.required, CustomValidators.phoneValidator]],
      empId: [null, [Validators.required]],
      gender: ["Male", [Validators.required]],
      age: [null, [Validators.required, CustomValidators.onlyNumberValidator]],
    });
  }

  getUser(contact: any) {
    const params = {contact};

    this._userService
      .list(params)
      .subscribe(
        res => {
          if (!(res.payload && res.payload.length > 0)) {
            this.router.navigate(['/']);
            return;
          }

          const data = res.payload[0];

          this.editForm.patchValue({
            name: data.name,
            email: data.email,
            contact: data.contact,
            otherContact: data.otherContact,
            empId: data.empId,
            gender: data.gender,
            age: data.age,
          });
        }
      )

  }

  submit() {
    if (!this.isFormValid()) return;
    
    const data = {
     ...this.editForm.value,
     age: parseInt(this.editForm.value.age, 10),
    }

    this._userService
      .add(data)
      .subscribe(
        (res: any) => {
          this.sweetAlert({icon: 'success', title: 'YEAH!!!', text: 'Account Updated Successfully'});
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
    this.editForm.markAllAsTouched();
    this.logValidationErrors();

    if (this.editForm.invalid) this.sweetAlert({icon: 'error', title: 'OOPS!!!', text: 'Form is not valid'});
    return this.editForm.valid;
  }

  logValidationErrors(group: FormGroup = this.editForm): void {
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
