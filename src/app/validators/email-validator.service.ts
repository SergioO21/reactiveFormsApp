import { Injectable } from "@angular/core";
import {
	AbstractControl,
	AsyncValidator,
	ValidationErrors,
} from "@angular/forms";
import { delay, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class EmailValidator implements AsyncValidator {
	validate(control: AbstractControl): Observable<ValidationErrors | null> {
		const email = control.value;
		console.log({ email });

		return new Observable<ValidationErrors | null>((subscriber) => {
			console.log({ email });

			if (email === "sergioorueda@gmail.com") {
				subscriber.next({ emailTaken: true });
				subscriber.complete();
			}

			subscriber.next(null);
			subscriber.complete();
		}).pipe(delay(3000));
	}
}
