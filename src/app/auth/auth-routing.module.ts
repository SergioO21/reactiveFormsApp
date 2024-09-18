import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterPageComponent } from "./pages";

const routes: Routes = [
	{
		path: "",
		children: [
			{
				path: "sign-up",
				component: RegisterPageComponent,
			},
			{
				path: "**",
				redirectTo: "sign-up",
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
