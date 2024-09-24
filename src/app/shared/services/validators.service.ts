import { Injectable } from "@angular/core";
import {
	AbstractControl,
	FormArray,
	FormControl,
	FormGroup,
	ValidationErrors,
} from "@angular/forms";

@Injectable({ providedIn: "root" })
export class ValidatorsService {
	namePattern = (control: FormControl): ValidationErrors | null => {
		const pattern = /([a-zA-Z]+) ([a-zA-Z]+)/;
		const name = control.value ?? "";
		const isValidName = pattern.test(name);

		return isValidName ? null : { invalidName: true };
	};

	emailPattern = (control: FormControl): ValidationErrors | null => {
		const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
		const email = control.value ?? "";
		const isValidEmail = pattern.test(email);

		return isValidEmail ? null : { invalidEmail: true };
	};

	cantBeStrider = (control: FormControl): ValidationErrors | null => {
		const username: string = control.value.trim().toLowerCase();

		return username === "strider" ? { isStrider: true } : null;
	};

	isValidField(form: FormGroup, field: string): boolean {
		return !!form.controls[field]?.errors && form.controls[field].touched;
	}

	isValidFieldInArray(form: FormArray, index: number): boolean {
		return !!form.controls[index]?.errors && form.controls[index].touched;
	}

	isPasswordMatch(control1: string, control2: string) {
		return (formGroup: AbstractControl): ValidationErrors | null => {
			const passwordValue1 = formGroup.get(control1)?.value;
			const passwordValue2 = formGroup.get(control2)?.value;

			if (passwordValue1 === passwordValue2) {
				const passwordControl2 = formGroup.get(control2);

				if (
					passwordControl2?.errors &&
					passwordControl2?.hasError("notMatch")
				) {
					delete passwordControl2.errors["notMatch"];
					passwordControl2?.updateValueAndValidity();
				}

				return null;
			}

			const currentErrors = formGroup.get(control2)?.errors || {};
			formGroup.get(control2)?.setErrors({
				...currentErrors,
				notMatch: true,
			});
			return { notMatch: true };
		};
	}
}
