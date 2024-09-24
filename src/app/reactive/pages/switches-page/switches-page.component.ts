import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorsService } from "../../../shared/services/validators.service";

@Component({
	templateUrl: "./switches-page.component.html",
	styles: ``,
})
export class SwitchesPageComponent implements OnInit {
	myForm: FormGroup = this.formBuilder.group({
		gender: ["", Validators.required],
		notifications: [true, Validators.required],
		termsAndConditions: [false, Validators.requiredTrue],
	});

	person = {
		gender: "M",
		notifications: false,
	};

	constructor(
		private formBuilder: FormBuilder,
		private validatorsService: ValidatorsService
	) {}

	ngOnInit() {
		this.myForm.reset(this.person);
	}

	isValidField(field: string): boolean {
		return this.validatorsService.isValidField(this.myForm, field);
	}

	onSave() {
		if (this.myForm.invalid) {
			this.myForm.markAllAsTouched();
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { termsAndConditions, ...newPerson } = this.myForm.value;

		this.person = newPerson;

		console.log(this.myForm.value);
		console.log(this.person);
	}
}
