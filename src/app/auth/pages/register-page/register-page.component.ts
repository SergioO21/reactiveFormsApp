import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorsService } from "../../../shared/services/validators.service";
import { EmailValidator } from "../../../validators/email-validator.service";

@Component({
	templateUrl: "./register-page.component.html",
	styles: ``,
})
export class RegisterPageComponent {
	public myForm: FormGroup = this.formBuilder.group(
		{
			name: ["", [Validators.required, this.validatorsService.namePattern]],
			email: [
				"",
				[Validators.required, this.validatorsService.emailPattern],
				[this.emailValidator],
			],
			username: [
				"",
				[
					Validators.required,
					Validators.minLength(5),
					this.validatorsService.cantBeStrider,
				],
			],
			password: ["", [Validators.required, Validators.minLength(6)]],
			password2: ["", [Validators.required, Validators.minLength(6)]],
		},
		{
			validators: [
				this.validatorsService.isPasswordMatch("password", "password2"),
			],
		}
	);

	constructor(
		private formBuilder: FormBuilder,
		private validatorsService: ValidatorsService,
		private emailValidator: EmailValidator
	) {}

	isValidField(field: string) {
		return this.validatorsService.isValidField(this.myForm, field);
	}

	onSubmit() {
		this.myForm.markAllAsTouched();
	}

	getFieldError(field: string, isPassword = false): string | undefined {
		if (!this.myForm.controls[field]) return;

		const errors = this.myForm.controls[field].errors ?? {};

		for (const error of Object.keys(errors)) {
			switch (error) {
				case "required":
					return `The ${isPassword ? "password" : "field"} is required.`;

				case "minlength":
					return `The ${isPassword ? "password" : "field"} must be longer than ${errors[error].requiredLength} characters.`;

				case "notMatch":
					return `${isPassword ? "Passwords" : "Fields"} must be the same.`;

				case "isStrider":
					return "Username cannot be Strider.";

				case "invalidEmail":
					return "Enter a valid email address.";

				case "invalidName":
					return "The name must be in first and last name format.";
			}
		}
		return;
	}
}
