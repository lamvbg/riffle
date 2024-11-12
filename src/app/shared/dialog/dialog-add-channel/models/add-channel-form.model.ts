import { FormControl } from "@angular/forms";

export interface AddChannelFormModel {
    name: FormControl<string>;
    type: FormControl<string>;
}