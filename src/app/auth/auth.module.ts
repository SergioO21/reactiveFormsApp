import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { RegisterPageComponent } from "./pages";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [RegisterPageComponent],
	imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
