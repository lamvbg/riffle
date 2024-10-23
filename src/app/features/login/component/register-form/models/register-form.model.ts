import { FormControl } from '@angular/forms';

export interface RegisterFormModel {
  email: FormControl<string>;
  displayName: FormControl<string | null>;
  username: FormControl<string>;
  password: FormControl<string>;
  date: FormControl<Date>;
}
