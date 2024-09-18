import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";
import { ReactiveRoutingModule } from "./reactive-routing.module";
import {
	BasicPageComponent,
	DynamicPageComponent,
	SwitchesPageComponent,
} from "./pages";

@NgModule({
	declarations: [
		BasicPageComponent,
		DynamicPageComponent,
		SwitchesPageComponent,
	],
	imports: [CommonModule, ReactiveRoutingModule, ReactiveFormsModule],
})
export class ReactiveModule {}
