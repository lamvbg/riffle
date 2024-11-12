import { FormControl } from "@angular/forms";

export interface AddServerFormModel {
    name: FormControl<string>;
    imageUrl: FormControl<string>;
}