import { Component } from "@angular/core";
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ValidatorsService } from "../../../shared/services/validators.service";

@Component({
	templateUrl: "./dynamic-page.component.html",
	styles: ``,
})
export class DynamicPageComponent {
	myForm: FormGroup = this.formBuilder.group({
		name: ["", [Validators.required, Validators.minLength(3)]],
		favoriteGames: this.formBuilder.array([
			["Metal Gear", Validators.required],
			["Gears of War", Validators.required],
		]),
	});

	newFavorite: FormControl = new FormControl("", Validators.required);

	constructor(
		private formBuilder: FormBuilder,
		private validatorsService: ValidatorsService
	) {}

	get favoriteGames() {
		return this.myForm.get("favoriteGames") as FormArray;
	}

	isValidField(field: string): boolean {
		return this.validatorsService.isValidField(this.myForm, field);
	}

	isValidFieldInArray(formArray: FormArray, index: number): boolean {
		return this.validatorsService.isValidFieldInArray(formArray, index);
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

	onAddToFavorites(): void {
		if (this.newFavorite.invalid) return;

		const newGame = this.newFavorite.value;

		this.favoriteGames.push(
			this.formBuilder.control(newGame, Validators.required)
		);

		this.newFavorite.reset();
	}

	onDeleteFavorite(index: number): void {
		this.favoriteGames.removeAt(index);
	}

	onSubmit(): void {
		if (this.myForm.invalid) {
			this.myForm.markAllAsTouched();
			return;
		}

		console.log(this.myForm.value);
		(this.myForm.controls["favoriteGames"] as FormArray) =
			this.formBuilder.array([]);
		this.myForm.reset();
	}
}
