import { FormControl } from '@angular/forms';

export interface RegisterFormModel {
  email: FormControl<string>;
  displayName: FormControl<string>;
  tag: FormControl<string>;
  password: FormControl<string>;
  imageUrl: FormControl<string>;
}
