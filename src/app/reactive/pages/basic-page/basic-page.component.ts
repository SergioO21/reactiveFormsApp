import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorsService } from "../../../shared/services/validators.service";

@Component({
	templateUrl: "./basic-page.component.html",
	styles: ``,
})
export class BasicPageComponent {
	public myForm: FormGroup = this.formBuilder.group({
		name: ["", [Validators.required, Validators.minLength(3)]],
		price: [0, [Validators.required, Validators.min(0)]],
		inStorage: [0, [Validators.required, Validators.min(0)]],
	});

	constructor(
		private formBuilder: FormBuilder,
		private validatorsService: ValidatorsService
	) {}

	isValidField(field: string): boolean {
		return this.validatorsService.isValidField(this.myForm, field);
	}

	getFieldError(field: string): string | undefined {
		if (!this.myForm.controls[field]) return;

		const errors = this.myForm.controls[field].errors ?? {};

		for (const error of Object.keys(errors)) {
			switch (error) {
				case "required":
					return "This field is required";

				case "minlength":
					return `Field requires minimum ${errors[error].requiredLength} characters`;
			}
		}
		return;
	}

	onSave(): void {
		if (this.myForm.invalid) {
			this.myForm.markAllAsTouched();
			return;
		}

		this.myForm.reset({
			price: 0,
			inStorage: 0,
		});
	}
}
