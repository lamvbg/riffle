import { FormControl } from "@angular/forms";

export interface ChangePasswordFormModel {
    oldPassword: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}