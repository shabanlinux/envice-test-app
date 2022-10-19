export class CustomValidationMessages {
  private static _validationMessages = {
    name: {
      required: "Name is required",
    },
    email: {
      required: "Email is required",
      invalid: "Email is invalid",
    },
    empId: {
      required: "Employee ID is required",
      maxlength: "Emploee ID cannot be greater than 10 characters",
    },
    gender: {
      required: "Gender is required",
    },
    age: {
      required: "Age is required",
    },
    contact: {
      required: "Phone number is required",
      minlength: "Phone number must be equal to 10 digits",
      digits: "Only digits allowed",
      length: "Phone number must be only 10 digits long",
    },
    otherContact: {
      required: "Phone number is required",
      minlength: "Phone number must be equal to 10 digits",
      digits: "Only digits allowed",
      length: "Phone number must be only 10 digits long",
    },
  };

  static get validationMessages() {
    return this._validationMessages;
  }
}
